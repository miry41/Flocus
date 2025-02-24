import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, getDocs, updateDoc, doc, query, where, deleteDoc } from 'firebase/firestore';
import '../style/Popup.css';
import { auth } from '../../firebase';
import EditAccount from './EditAccount'; // EditAccountコンポーネントをインポート

function Account({ userData, onClose, onFollow }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // 編集状態を管理するための状態を追加
  const loggedInUserUid = auth.currentUser.uid;

  useEffect(() => {
    const checkIfFollowing = async () => {
      const followingRef = collection(db, 'users', loggedInUserUid, 'following');
      const q = query(followingRef, where('id', '==', userData.id));
      const querySnapshot = await getDocs(q);
      setIsFollowing(!querySnapshot.empty);
    };

    checkIfFollowing();
  }, [loggedInUserUid, userData.id]);

  const handleFollow = async () => {
    const followingRef = collection(db, 'users', loggedInUserUid, 'following');
    const followerRef = collection(db, 'users', userData.id, 'follower');

    try {
      // フォローするユーザーの following コレクションに追加
      await addDoc(followingRef, {
        id: userData.id
      });

      // フォローされるユーザーの follower コレクションに追加
      await addDoc(followerRef, {
        id: loggedInUserUid
      });

      // フォロー数を更新
      const followingSnapshot = await getDocs(followingRef);
      const followingCount = followingSnapshot.size;

      const userDocRef = doc(db, 'users', loggedInUserUid);
      await updateDoc(userDocRef, {
        following: followingCount
      });

      // フォロワー数を更新
      const followerSnapshot = await getDocs(followerRef);
      const followerCount = followerSnapshot.size;

      const followedUserDocRef = doc(db, 'users', userData.id);
      await updateDoc(followedUserDocRef, {
        follower: followerCount
      });

      if (typeof onFollow === 'function') {
        onFollow();
      } else {
        console.error('onFollow is not a function');
      }

      setIsFollowing(true);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const handleUnfollow = async () => {
    const followingRef = collection(db, 'users', loggedInUserUid, 'following');
    const followerRef = collection(db, 'users', userData.id, 'follower');

    try {
      // フォローするユーザーの following コレクションから削除
      const q1 = query(followingRef, where('id', '==', userData.id));
      const querySnapshot1 = await getDocs(q1);
      querySnapshot1.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      // フォローされるユーザーの follower コレクションから削除
      const q2 = query(followerRef, where('id', '==', loggedInUserUid));
      const querySnapshot2 = await getDocs(q2);
      querySnapshot2.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      // フォロー数を更新
      const followingSnapshot = await getDocs(followingRef);
      const followingCount = followingSnapshot.size;

      const userDocRef = doc(db, 'users', loggedInUserUid);
      await updateDoc(userDocRef, {
        following: followingCount
      });

      // フォロワー数を更新
      const followerSnapshot = await getDocs(followerRef);
      const followerCount = followerSnapshot.size;

      const followedUserDocRef = doc(db, 'users', userData.id);
      await updateDoc(followedUserDocRef, {
        follower: followerCount
      });

      setIsFollowing(false);
    } catch (error) {
      console.error('Error removing document: ', error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true); // 編集状態にする
  };

  const handleCloseEdit = () => {
    setIsEditing(false); // 編集状態を解除する
  };

  return (
    <div>
      {isEditing ? (
        <EditAccount userData={userData} onClose={handleCloseEdit} /> // 編集状態の場合はEditAccountコンポーネントを表示
      ) : (
        <div className="popupOverlay" onClick={onClose}>
          <div className="popupContent" onClick={(e) => e.stopPropagation()}>
            <button className="closeButton" onClick={onClose}>X</button>
            <h2>{userData.name}</h2>
            <img className="profile-image" src={userData.photoURL} alt="Profile" />
            <p>Followers: {userData.followers}</p>
            <p>ID: {userData.id}</p>
            {loggedInUserUid === userData.id ? (
              <button className="settingsButton" onClick={handleEdit}>アカウント</button> // 設定ボタンのクリックハンドラーを追加
            ) : isFollowing ? (
              <button className="unfollowButton" onClick={handleUnfollow}>フォロー解除</button>
            ) : (
              <button className="followButton" onClick={handleFollow}>フォロー</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Account;
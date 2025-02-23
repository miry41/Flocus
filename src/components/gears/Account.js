import React from 'react';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import '../style/Popup.css';

function Account({ userData, onClose, onFollow, uid }) {
  const handleFollow = async () => {
        console.log('uid:', uid);
    console.log('userData.id:', userData.id);

    const followingRef = collection(db, 'users', uid, 'following');
    const followerRef = collection(db, 'users', userData.id, 'follower');

    try {
      // フォローするユーザーの following コレクションに追加
      await addDoc(followingRef, {
        id: userData.id
      });

      // フォローされるユーザーの follower コレクションに追加
      await addDoc(followerRef, {
        id: uid
      });

      if (typeof onFollow === 'function') {
        onFollow();
      } else {
        console.error('onFollow is not a function');
      }
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div className="popupOverlay" onClick={onClose}>
      <div className="popupContent" onClick={(e) => e.stopPropagation()}>
        <button className="closeButton" onClick={onClose}>X</button>
        <h2>{userData.name}</h2>
        <img className="profile-image" src={userData.photoURL} alt="Profile" />
        <p>Followers: {userData.followers}</p>
        <p>ID: {userData.id}</p>
        <button className="followButton" onClick={handleFollow}>フォロー</button>
      </div>
    </div>
  );
}

export default Account;
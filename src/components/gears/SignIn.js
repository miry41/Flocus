import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect, useCallback } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { auth } from '../../firebase';

function SignIn() {
  // signIn機能は編集せずに残す
  const db = firebase.firestore();
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth
      .signInWithPopup(provider)
      .then(async (result) => {
        const user = result.user;
        const uid = user?.uid;
        if (!uid) return;

        // Firestoreの `/users/{uid}` を確認
        const userDocRef = db.collection('users').doc(uid);
        const userDoc = await userDocRef.get();

        if (userDoc.exists) {
          // 既存ユーザーなら画面をリロード
          window.location.reload();
        } else {
          // Firestore に新規ユーザーのデータを作成
          await userDocRef.set({
            id: uid,
            currentTaskId: "",
            followers: 0,
            following: 0,
            name: user.displayName || "Unknown",
            photoURL: user.photoURL || "",
            weeklyStudyTime: 0,
          });

          // studyLog サブコレクションに totalTime: 0 のドキュメントを追加
          await userDocRef.collection('studyLog').add({
            totalTime: 0,
          });

          // tasks サブコレクションを作成（空のサブコレクション）
          await userDocRef.collection('tasks').doc(); // 空のドキュメント作成

          // モーダルを表示（サインイン機能内部保持）
          setShowNewAccountPopup(true);
        }
      })
      .catch((error) => {
        console.error('サインインエラー:', error);
      });
  };

  // 以下、Base.jsと同様のUI表示部分
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewAccountPopup, setShowNewAccountPopup] = useState(false); // サインインで利用

  const updateTime = useCallback(() => {
    const now = new Date();
    const jstTime = now.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit', hour12: false });
    const jstDate = now.toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric', weekday: 'short' });
    setCurrentTime(jstTime);
    setCurrentDate(jstDate);
  }, []);

  useEffect(() => {
    updateTime();
    const timer = setInterval(updateTime, 60000); // 1分ごとに更新
    return () => clearInterval(timer);
  }, [updateTime]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchKeyPress = (event) => {
    if (event.key === 'Enter') {
      const query = encodeURIComponent(searchQuery);
      window.open(`https://www.google.com/search?q=${query}`, '_blank');
    }
  };

  return (
    <div className="text-center">
      <h5>{currentDate}</h5>
      <h1 className="display-1">{currentTime}</h1>
      <button
        className="btn btn-primary mt-3"
        onClick={signInWithGoogle}
      >
        Googleでサインイン
      </button>
      <input
        type="text"
        placeholder="Googleで検索..."
        value={searchQuery}
        onChange={handleSearchChange}
        onKeyPress={handleSearchKeyPress}
        className="form-control mx-auto mt-3"
        style={{ maxWidth: "500px" }}
      />
      {showNewAccountPopup && (
        <div className="modal mt-3">
          {/* TODO: モーダルの実装内容を追加 */}
          <p>新規アカウントが作成されました。</p>
        </div>
      )}
    </div>
  );
}

export default SignIn;

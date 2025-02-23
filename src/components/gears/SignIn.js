import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import React, { useState } from 'react';
import { auth } from '../../firebase';

function SignIn() {
  const [setShowNewAccountPopup] = useState(false);
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
            currentTaskId: "",
            followers: "",
            following: "",
            name: user.displayName || "Unknown",
            weeklyStudyTime: 0,
          });

          // studyLog サブコレクションに totalTime: 0 のドキュメントを追加
          await userDocRef.collection('studyLog').add({
            totalTime: 0,
          });

          // tasks サブコレクションを作成（空のサブコレクション）
          await userDocRef.collection('tasks').doc(); // 空のドキュメント作成

          // モーダルを表示
          setShowNewAccountPopup(true);
        }
      })
      .catch((error) => {
        console.error('サインインエラー:', error);
      });
  };

  return (
    <div>
      <Button onClick={signInWithGoogle}>googleでログイン</Button>
    </div>
  );
}

export default SignIn;

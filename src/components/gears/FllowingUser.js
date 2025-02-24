import React, { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/FllowingUser.css';

function FllowingUser({ id }) {
  const [userData, setUserData] = useState(null);
  const [taskName, setTaskName] = useState(null);

  // ユーザードキュメントのリアルタイムリスナー
  useEffect(() => {
    const userDocRef = doc(db, "users", id);
    const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      } else {
        console.log("ユーザードキュメントが存在しません:", id);
      }
    }, (error) => {
      console.error("ユーザー情報の取得エラー:", error);
    });

    return () => unsubscribe();
  }, [id]);

  // tasks サブコレクション内の currentTaskId ドキュメントのリアルタイムリスナー
  useEffect(() => {
    let unsubscribeTask;
    if (userData && userData.currentTaskId) {
      const taskDocRef = doc(db, "users", id, "tasks", userData.currentTaskId);
      unsubscribeTask = onSnapshot(taskDocRef, (docSnap) => {
        if (docSnap.exists()) {
          setTaskName(docSnap.data().name);
        } else {
          console.log("タスクドキュメントが存在しません:", userData.currentTaskId);
          setTaskName(null);
        }
      }, (error) => {
        console.error("タスク情報の取得エラー:", error);
      });
    } else {
      setTaskName(null);
    }
    return () => {
      if (unsubscribeTask) unsubscribeTask();
    };
  }, [userData, id]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="following-user d-flex align-items-center">
      <img className="f-profile-image me-3" src={userData.photoURL} alt={userData.name} />
      <div>
        <p className="mb-1">Name: {userData.name}</p>
        {
          userData.currentTaskId ? (
            taskName ? (
              <p className="mb-0">Task Name: {taskName}</p>
            ) : (
              <p className="mb-0">Loading task details...</p>
            )
          ) : (
            <p className="mb-0">現在タスクは設定されていません</p>
          )
        }
      </div>
    </div>
  );
}

export default FllowingUser;
// src/components/gears/CurrentTask.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CurrentOn from './CurrentOn';
import EmptyTask from './EmptyTask';
import { getFirestore, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

function CurrentTask() {
  const [data, setData] = useState({ currentTaskId: "" });
  
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const db = getFirestore();
      const docRef = doc(db, 'users', user.uid);
      const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          setData(docSnap.data());
        }
      });
      return () => unsubscribe();
    }
  }, []);

  const handleComplete = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return;
      const db = getFirestore();
      const userDocRef = doc(db, 'users', user.uid);
      // ユーザードキュメントのcurrentTaskIdをクリア
      await updateDoc(userDocRef, { currentTaskId: "" });
      // currentTaskIdが存在する場合、対応するタスクのstatusを"Done"に更新
      if (data.currentTaskId !== "") {
        const taskDocRef = doc(db, 'users', user.uid, 'tasks', data.currentTaskId);
        await updateDoc(taskDocRef, { status: "Done" });
      }
    } catch (error) {
      console.error("Error updating tasks: ", error);
    } finally {
      // NOWタスクのCommitTime更新タイマーを停止
      if (window.taskTimer) {
        clearInterval(window.taskTimer);
        window.taskTimer = null;
      }
    }
  };

  const handleInterrupt = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return;
      const db = getFirestore();
      const userDocRef = doc(db, 'users', user.uid);
      const currentTaskId = data.currentTaskId;
      // ユーザードキュメントのcurrentTaskIdをクリア
      await updateDoc(userDocRef, { currentTaskId: "" });
      // currentTaskIdが存在する場合、対応するタスクのstatusを"yet"に更新
      if (currentTaskId !== "") {
        const taskDocRef = doc(db, 'users', user.uid, 'tasks', currentTaskId);
        await updateDoc(taskDocRef, { status: "yet" });
      }
    } catch (error) {
      console.error("Error interrupting task: ", error);
    } finally {
      // NOWタスクのCommitTime更新タイマーを停止
      if (window.taskTimer) {
        clearInterval(window.taskTimer);
        window.taskTimer = null;
      }
    }
  };

  return (
    <div className="container mt-2">
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-header">着手中</div>
            <div className="card-body">
              {data.currentTaskId === "" ? (
                <EmptyTask />
              ) : (
                <CurrentOn tasks={data} />
              )}
            </div>
            {data.currentTaskId !== "" && (
              <div className="card-footer text-end">
                <button onClick={handleInterrupt} className="btn btn-warning me-2">
                  中断
                </button>
                <button onClick={handleComplete} className="btn btn-success">
                  完了
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentTask;

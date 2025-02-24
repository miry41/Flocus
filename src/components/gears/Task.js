// src/components/gears/Task.js
import React from 'react';
import { doc, deleteDoc, updateDoc, getDoc, increment } from "firebase/firestore";
import { db } from "../../firebase";
import { getAuth } from 'firebase/auth';
import Battery from './Battery'; // Batteryコンポーネントを使用

function Task({ task }) {
  // 完了タスクの場合は、タスク名とステータスのみ表示
  if (task.status === "Done") {
    return (
      <div className="bg-light py-2 px-3 m-0 rounded">
        <ul className="list-group m-0">
          <li className="list-group-item d-flex justify-content-between align-items-center m-0">
            {task.name}
            <span className="badge bg-primary">{task.status}</span>
          </li>
        </ul>
      </div>
    );
  }

  // 未完了タスクの場合
  const minutes = task.CommitTime % 60;
  const progressWidth = (minutes / 60) * 100;

  const handleDeleteTask = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const taskDocRef = doc(db, "users", user.uid, "tasks", task.id);
        await deleteDoc(taskDocRef);
      }
    } catch (error) {
      console.error("タスク削除エラー: ", error);
    }
  };

  const handleNowTask = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const currentTaskId = userDocSnap.data().currentTaskId;
          if (currentTaskId) {
            const oldTaskDocRef = doc(db, "users", user.uid, "tasks", currentTaskId);
            await updateDoc(oldTaskDocRef, { status: "yet" });
          }
        }
        await updateDoc(userDocRef, { currentTaskId: task.id });
        const taskDocRef = doc(db, "users", user.uid, "tasks", task.id);
        await updateDoc(taskDocRef, { status: "NOW" });

        window.taskTimer = setInterval(async () => {
          try {
            await updateDoc(taskDocRef, { CommitTime: increment(1) });
            await updateDoc(userDocRef, { weeklyStudyTime: increment(1) });
          } catch (error) {
            console.error("タイマー更新エラー: ", error);
          }
        }, 600);
      }
    } catch (error) {
      console.error("NOW更新エラー: ", error);
    }
  };

  const handleCompleteTask = async () => {
    try {
      clearInterval(window.taskTimer);
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const taskDocRef = doc(db, "users", user.uid, "tasks", task.id);
        await updateDoc(taskDocRef, { status: "Done" });
        await updateDoc(userDocRef, { currentTaskId: null });
      }
    } catch (error) {
      console.error("完了処理エラー: ", error);
    }
  };

  const handleAbortTask = async () => {
    try {
      clearInterval(window.taskTimer);
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const taskDocRef = doc(db, "users", user.uid, "tasks", task.id);
        await updateDoc(taskDocRef, { status: "yet" });
        await updateDoc(userDocRef, { currentTaskId: null });
      }
    } catch (error) {
      console.error("中断処理エラー: ", error);
    }
  };

  return (
    <div className="bg-light py-2 px-3 m-0 rounded">
      <ul className="list-group m-0">
        <li className="list-group-item d-flex justify-content-between align-items-center m-0">
          {task.name}
          <span className="badge bg-primary">{task.status}</span>
        </li>
      </ul>
      {/* Batteryと進捗バー */}
      <div className="d-flex align-items-center">
        <div style={{ width: '50px', textAlign: 'center' }}>
          <Battery commitTime={task.CommitTime} />
        </div>
        <div className="flex-grow-1 ms-3">
          <div className="progress my-2 m-0" style={{ height: '8px' }}>
            <div
              className="progress-bar"
              role="progressbar"
              style={{
                width: `${progressWidth}%`,
                backgroundColor: 'limegreen'
              }}
              aria-valuenow={minutes}
              aria-valuemin="0"
              aria-valuemax="60"
            ></div>
          </div>
        </div>
      </div>
      {/* 操作ボタン */}
      <button onClick={handleDeleteTask} className="btn btn-danger mt-2">
        消去
      </button>
      {task.status !== "NOW" ? (
        <button onClick={handleNowTask} className="btn btn-success mt-2 ms-2">
          NOWへ
        </button>
      ) : (
        <>
          <button onClick={handleCompleteTask} className="btn btn-primary mt-2 ms-2">
            完了
          </button>
          <button onClick={handleAbortTask} className="btn btn-secondary mt-2 ms-2">
            中断
          </button>
        </>
      )}
    </div>
  );
}

export default Task;

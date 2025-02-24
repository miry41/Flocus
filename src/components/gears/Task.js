import React from 'react';
import { doc, deleteDoc, updateDoc, getDoc, increment } from "firebase/firestore";
import { db } from "../../firebase"; // firebase設定ファイルのパスに合わせて修正してください
import { getAuth } from 'firebase/auth'; // Firebase Authをインポート

function Task({ task }) {
  // task.CommitTimeは分単位と仮定
  const minutes = task.CommitTime % 60;
  // 1時間に対する現在の分数の割合を計算
  const progressWidth = (minutes / 60) * 100;

  const handleDeleteTask = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        // task.id を利用して削除対象のドキュメントを指定
        const taskDocRef = doc(db, "users", user.uid, "tasks", task.id);
        await deleteDoc(taskDocRef);
        //console.log("タスクを正常に消去しました。");
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
        // ユーザドキュメントから現在のcurrentTaskIdフィールドを取得
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const currentTaskId = userDocSnap.data().currentTaskId;
          if (currentTaskId) {
            // 既存のcurrentTaskIdがある場合、該当タスクのstatusを"yet"に更新
            const oldTaskDocRef = doc(db, "users", user.uid, "tasks", currentTaskId);
            await updateDoc(oldTaskDocRef, { status: "yet" });
          }
        }
        
        // ユーザドキュメントの currentTaskId フィールドを更新
        await updateDoc(userDocRef, { currentTaskId: task.id });
        
        // 該当タスクドキュメントのstatusフィールドを"NOW"に更新
        const taskDocRef = doc(db, "users", user.uid, "tasks", task.id);
        await updateDoc(taskDocRef, { status: "NOW"});
        
        // 1分ごとにCommitTimeを1増加する処理を開始
        window.taskTimer = setInterval(async () => {
          try {
            await updateDoc(taskDocRef, { CommitTime: increment(1) });
          } catch (error) {
            console.error("CommitTime increment error: ", error);
          }
        }, 60000);
      }
    } catch (error) {
      console.error("NOW更新エラー: ", error);
    }
  };

  return (
    <div className="bg-light py-2 px-3 m-0 rounded">
      <ul className="list-group m-0">
        <li className="list-group-item d-flex justify-content-between align-items-center m-0">
          {task.name}
          <span className="badge bg-primary">
            {task.status}
          </span>
        </li>
      </ul>
      <div className="progress my-2 m-0">
        <div className="progress-bar bg-info" style={{ width: `${progressWidth}%` }}></div>
      </div>
      {task.status !== "Done" && (
        <>
          <button onClick={handleDeleteTask} className="btn btn-danger mt-2">消去</button>
          <button onClick={handleNowTask} className="btn btn-success mt-2 ms-2">NOWへ</button>
        </>
      )}
    </div>
  );
}

export default Task;
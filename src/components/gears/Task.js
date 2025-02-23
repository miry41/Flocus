import React from 'react';
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase"; // firebase設定ファイルのパスに合わせて修正してください

function Task({ task }) {
  // task.CommitTimeは分単位と仮定
  const minutes = task.CommitTime % 60;
  // 1時間に対する現在の分数の割合を計算
  const progressWidth = (minutes / 60) * 100;

  const handleDeleteTask = async () => {
    try {
      // task.id を利用して削除対象のドキュメントを指定
      const taskDocRef = doc(db, "users", "RXVjqgF9u6qtGHGRAAk6", "tasks", task.id);
      await deleteDoc(taskDocRef);
      console.log("タスクを正常に消去しました。");
    } catch (error) {
      console.error("タスク削除エラー: ", error);
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
      <button onClick={handleDeleteTask} className="btn btn-danger mt-2">タスクを消去</button>
    </div>
  );
}

export default Task;
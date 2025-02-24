import React, { useState, useEffect } from 'react';
import Task from './Task';
import { db } from '../../firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // Firebase Authをインポート
import '../style/TaskLists.css'; // CSSファイルをインポート

function TaskLists() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const colRef = collection(db, "users", user.uid, "tasks");
      const q = query(colRef, where("status", "not-in", ["Done", "NOW"])); // status が Done および NOW 以外のもののみ取得
      
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const taskList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(), // Firestore のデータ
        }));
        setTasks(taskList);
      });

      return () => unsubscribe();
    }
  }, []); // ロード時一回のみ実行

  return (
    <div className="task-list-box">
      <div className="tasks list-group">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task.id} className="list-group-item">
              <Task task={task} />
            </div>
          ))
        ) : (
          <p className="text-muted">タスクが見つかりません</p>
        )}
      </div>
    </div>
  );
}

export default TaskLists;
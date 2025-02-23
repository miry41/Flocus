import React, { useState, useEffect, useRef } from 'react';
import Task from './Task';
import { db } from '../../firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // Firebase Authをインポート
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/DoneTaskLists.css'; // CSSファイルをインポート

function DoneTaskLists() {
  const [tasks, setTasks] = useState([]);
  const taskListBoxRef = useRef(null);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const colRef = collection(db, "users", user.uid, "tasks");
      const q = query(colRef, where("status", "==", "Done")); // status が Done のものだけを取得
      
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

  useEffect(() => {
    if (taskListBoxRef.current) {
      taskListBoxRef.current.style.height = `${taskListBoxRef.current.scrollHeight}px`;
    }
  }, [tasks]);

  return (
    <div className="donetask-list-box" ref={taskListBoxRef}>
      <div className="donetasks list-group">
        {tasks.length > 0 ? (
          tasks.map((task) => <Task key={task.id} task={task} className="list-group-item" />)
        ) : (
          <p className="text-muted">タスクが見つかりません</p>
        )}
      </div>
    </div>
  );
}

export default DoneTaskLists;
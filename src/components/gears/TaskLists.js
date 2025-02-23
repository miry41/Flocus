import React, { useState, useEffect } from 'react'
import Task from './Task'
import { db } from '../../firebase'
import { collection, onSnapshot } from 'firebase/firestore'
import { getAuth } from 'firebase/auth' // Firebase Authをインポート
import '../style/TaskLists.css'; // CSSファイルをインポート

function TaskLists() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const auth = getAuth()
    const user = auth.currentUser

    if (user) {
      const colRef = collection(db, "users", user.uid, "tasks")
      
      const unsubscribe = onSnapshot(colRef, (querySnapshot) => {
        const taskList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(), // Firestore のデータ
        }))
        setTasks(taskList)
      })

      return () => unsubscribe()
    }
  }, []) // ロード時一回のみ実行

  return (
    <div className="task-list-box">
      <div className="tasks list-group">
        {tasks.length > 0 ? (
          tasks.map((task) => <Task key={task.id} task={task} className="list-group-item" />)
        ) : (
          <p className="text-muted">タスクが見つかりません</p>
        )}
      </div>
    </div>
  );
}

export default TaskLists
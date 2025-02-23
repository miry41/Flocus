import React, { useState, useEffect } from 'react'
import Task from './Task'
import { db } from '../../firebase'
import { collection, onSnapshot } from 'firebase/firestore'
import { getAuth } from 'firebase/auth' // Firebase Authをインポート

function DoneTaskLists() {
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
    <div>
      <div className="tasks">
        {tasks.length > 0 ? (
          tasks.map((task) => <Task key={task.id} task={task} />)
        ) : (
          <p>タスクが見つかりません</p>
        )}
      </div>
    </div>
  )
}

export default DoneTaskLists
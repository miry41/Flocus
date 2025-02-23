import React, { useState, useEffect } from 'react'
import Task from './Task'
import { db } from '../../firebase'
import { collection, onSnapshot } from 'firebase/firestore'

function TaskLists() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    // ここ後で編集する必要あり
    const colRef = collection(db, "users", "RXVjqgF9u6qtGHGRAAk6", "tasks")
    
    const unsubscribe = onSnapshot(colRef, (querySnapshot) => {
      const taskList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(), // Firestore のデータ
      }))
      setTasks(taskList)
    })

    return () => unsubscribe()
  }, [])

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

export default TaskLists
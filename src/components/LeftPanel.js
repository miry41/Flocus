import React, { useState } from 'react'
import AddTask from './gears/AddTask'
import TaskLists from './gears/TaskLists'

function LeftPanel() {
  const [showAddTask, setShowAddTask] = useState(false)

  return (
    <div className="m-3" style={{ margin: '2rem' }}>
      <div className="card h-100">
        <div className="card-header">タスク</div>
        <div className="card-body">
          <button className="btn btn-primary mb-2" onClick={() => setShowAddTask(true)}>
            Add Task!
          </button>
          {showAddTask && <AddTask onClose={() => setShowAddTask(false)} />}
          <TaskLists />
        </div>
      </div>
    </div>
  )
}

export default LeftPanel

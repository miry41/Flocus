import React, { useState } from 'react'
import AddTask from './gears/AddTask'
import Tasklists from './gears/TaskLists'

function LeftPanel() {
    const [showAddTask, setShowAddTask] = useState(false)

    return (
        <div className="leftPanel">
            <button className="btn btn-primary" onClick={() => setShowAddTask(true)}>
                Add Task!
            </button>
            {showAddTask && <AddTask onClose={() => setShowAddTask(false)} />}
            <Tasklists />
        </div>
    )
}

export default LeftPanel
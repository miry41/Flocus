import React from 'react'
import AddTask from './gears/AddTask'
import Tasklists from './gears/TaskLists'

function LeftPanel() {
    return (
        <div className="leftPanel">
            <AddTask />
            <Tasklists />
        </div>
    )
}

export default LeftPanel
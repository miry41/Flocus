import React, { useState } from 'react';
import AddTask from './gears/AddTask';
import TaskLists from './gears/TaskLists';

function LeftPanel() {
  const [showAddTask, setShowAddTask] = useState(false);

  return (
    <div className="m-1" style={{ margin: '2rem' }}>
      <div className="card h-100">
        <div className="card-header d-flex justify-content-between align-items-center">
          <span>タスク</span>
          <button className="btn btn-primary btn-sm mb-2 ms-auto" onClick={() => setShowAddTask(true)}>
            Add Task!
          </button>
        </div>
        <div className="card-body">
          {showAddTask && <AddTask onClose={() => setShowAddTask(false)} />}
          <TaskLists />
        </div>
      </div>
    </div>
  );
}

export default LeftPanel;
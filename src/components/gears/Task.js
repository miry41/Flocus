import React from 'react';

function Task({ task }) {
  const progress = task.achieveTime
    ? (task.CommitTime / task.achieveTime) * 100
    : 0;

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
        <div className="progress-bar bg-info" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
}

export default Task;

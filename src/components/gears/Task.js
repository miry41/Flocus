import React from 'react';

function Task({ task }) {
  // task.CommitTimeは分単位と仮定
  const minutes = task.CommitTime % 60;
  // 1時間に対する現在の分数の割合を計算
  const progressWidth = (minutes / 60) * 100;

  return (
    <div className="bg-light py-2 px-3 m-0 rounded">
      {console.log(task)}
      <ul className="list-group m-0">
        <li className="list-group-item d-flex justify-content-between align-items-center m-0">
          {task.name}
          <span className="badge bg-primary">
            {task.status}
          </span>
        </li>
      </ul>
      <div className="progress my-2 m-0">
        <div className="progress-bar bg-info" style={{ width: `${progressWidth}%` }}></div>
      </div>
    </div>
  );
}

export default Task;

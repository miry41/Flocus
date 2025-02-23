import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DoneTaskLists from './DoneTaskLists';

function DoneTasks() {
  return (
    <div className="container mt-2">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              完了
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="card-body">
                  左側のコンテンツ
                </div>
              </div>
              <div className="col-md-8">
                <div className="card-body" style={{ height: '23vh', overflowY: 'scroll' }}>
                  <DoneTaskLists />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoneTasks;
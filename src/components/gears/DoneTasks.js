import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function DoneTasks() {
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col">
          <div className="card" style={{ height: '100%' }}>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <h5>左側のコンテンツ</h5>
                  <p>ここに左側の詳細なコンテンツを追加します。</p>
                </div>
                <div className="col-md-6">
                  <h5>右側のコンテンツ</h5>
                  <p>ここに右側の詳細なコンテンツを追加します。</p>
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
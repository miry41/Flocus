import React from 'react';
import Base from './gears/Base';
import CurrentTask from './gears/CurrentTask';
import DoneTasks from './gears/DoneTasks';
import 'bootstrap/dist/css/bootstrap.min.css';

function MainPanel() {
  return (
    <div className="container-fluid mainPanel d-flex flex-column">
      <div className="row flex-grow-1 w-100">
        <div className="col-12" style={{ height: "30vh" }}>
          <Base />
        </div>
        <div className="col-12" style={{ height: "35vh" }}>
          <CurrentTask />
        </div>
        <div className="col-12" style={{ height: "25vh" }}>
          <DoneTasks />
        </div>
      </div>
    </div>
  );
}

export default MainPanel;
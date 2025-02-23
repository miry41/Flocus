import React from 'react';
import Base from './gears/Base';
import CurrentTask from './gears/CurrentTask';
import DoneTasks from './gears/DoneTasks';

function MainPanel() {
  return (
    <div className="mainPanel">
      <Base />
      <CurrentTask />
      <DoneTasks />
    </div>
  );
}

export default MainPanel;
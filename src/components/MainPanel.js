import React from 'react';
import Time from './gears/Time';
import CurrentTask from './gears/CurrentTask';
import DoneTasks from './gears/DoneTasks';

function MainPanel() {
  return (
    <div className="mainPanel">
      <Time />
      <CurrentTask />
      <DoneTasks />
    </div>
  );
}

export default MainPanel;
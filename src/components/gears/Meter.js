// src/components/gears/Meter.js
import React from 'react';

const Meter = ({ commitTime }) => {
  const minutes = commitTime % 60;
  const progressWidth = (minutes / 60) * 100;
  return (
    <div className="progress" style={{ height: '8px' }}>
      <div
        className="progress-bar bg-info"
        role="progressbar"
        style={{ width: `${progressWidth}%` }}
        aria-valuenow={minutes}
        aria-valuemin="0"
        aria-valuemax="60"
      ></div>
    </div>
  );
};

export default Meter;

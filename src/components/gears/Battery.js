// src/components/gears/Battery.js
import React from 'react';

const Battery = ({ commitTime }) => {
  const hours = Math.floor(commitTime / 60);
  if (hours <= 0) return null;
  return <div style={{ fontSize: '1.25rem' }}>{`🔋${hours}`}</div>;
};

export default Battery;

// src/components/gears/CurrentOn.js
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import Battery from './Battery';
import Meter from './Meter';

const CurrentOn = ({ tasks }) => {
  const uid = tasks.id;
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    const taskRef = db
      .collection('users')
      .doc(uid)
      .collection('tasks')
      .doc(tasks.currentTaskId);

    const unsubscribe = taskRef.onSnapshot((snapshot) => {
      if (snapshot.exists) {
        setCurrentTask({ id: snapshot.id, ...snapshot.data() });
      } else {
        console.log('No such task!');
        setCurrentTask(null);
      }
    }, (error) => {
      console.error('Error on snapshot:', error);
    });

    return () => unsubscribe();
  }, [tasks.currentTaskId, uid]);

  // 締め切りまでの残り時間を計算するヘルパー関数
  const getCountdown = (deadlineStr) => {
    const deadline = new Date(deadlineStr);
    const now = new Date();
    const diff = deadline - now; // ミリ秒単位
    if (diff <= 0) {
      return { text: '期限切れ', color: 'red' };
    }
    const diffHours = diff / (1000 * 60 * 60);
    // 24時間未満なら「あと◯時間」表示（色は赤）
    if (diffHours < 24) {
      const hoursLeft = Math.ceil(diffHours);
      return { text: `あと${hoursLeft}時間`, color: 'red' };
    }
    const diffDays = Math.floor(diffHours / 24);
    // 表示は最大「あと10日」
    const displayDays = diffDays > 10 ? 10 : diffDays;
    let color = 'yellow';
    if (diffDays <= 3 && diffDays >= 1) {
      color = 'orange';
    }
    if (diffDays < 1) {
      color = 'red';
    }
    return { text: `あと${displayDays}日`, color };
  };

  if (!currentTask) {
    return <div>Loading...</div>;
  }

  const countdown = getCountdown(currentTask.deadline);

  return (
    <div className="list-group-item">
      {/* ヘッダー部分：大きく中央揃えのタスク名と締め切り表示 */}
      <div className="mb-2">
        <div className="text-center fw-bold" style={{ fontSize: '1.75rem' }}>
          {currentTask.name}
        </div>
        <div className="text-center" style={{ color: countdown.color, fontWeight: 'bold' }}>
          {countdown.text}
        </div>
      </div>
      {/* 下段：Battery, Meter, 右側に「1h」を表示 */}
      <div className="d-flex align-items-center">
        <div style={{ width: '50px', textAlign: 'center' }}>
          <Battery commitTime={currentTask.CommitTime} />
        </div>
        <div className="flex-grow-1 ms-3">
          <Meter commitTime={currentTask.CommitTime} />
        </div>
        <div className="ms-3 fw-bold">1h</div>
      </div>
    </div>
  );
};

export default CurrentOn;


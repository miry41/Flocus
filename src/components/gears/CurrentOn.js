// src/components/gears/CurrentOn.js
import React, { useEffect, useState } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { db } from '../../firebase';
import Battery from './Battery';
import Meter from './Meter';

const CurrentOn = ({ tasks }) => {
  const uid = tasks.id;
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const taskRef = db
          .collection('users')
          .doc(uid)
          .collection('tasks')
          .doc(tasks.currentTaskId);
        const taskDoc = await taskRef.get();
        if (taskDoc.exists) {
          setCurrentTask({ id: taskDoc.id, ...taskDoc.data() });
        } else {
          console.log('No such task!');
        }
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };

    fetchTask();
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

  return (
    <>
      {currentTask ? (
        <Draggable key={currentTask.id} draggableId={currentTask.id} index={0}>
          {(provided) => {
            const countdown = getCountdown(currentTask.deadline);
            return (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className="list-group-item"
              >
                {/* ヘッダー行：左にタスク名、右に締め切りまでの残り時間 */}
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div className="fw-bold">{currentTask.name}</div>
                  <div style={{ color: countdown.color, fontWeight: 'bold' }}>
                    {countdown.text}
                  </div>
                </div>
                {/* BatteryとMeterを横並びに配置 */}
                <div className="d-flex align-items-center">
                  <div style={{ width: '50px', textAlign: 'center' }}>
                    <Battery commitTime={currentTask.CommitTime} />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <Meter commitTime={currentTask.CommitTime} />
                  </div>
                </div>
              </div>
            );
          }}
        </Draggable>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default CurrentOn;


// src/components/gears/CurrentOn.js
import React, { useEffect, useState } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { db } from '../../firebase'; // Firebase設定ファイルのパスに合わせてください
import Battery from './Battery';
import Meter from './Meter';

const CurrentOn = ({ tasks }) => {
  const uid = tasks.id;
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const taskRef = db.collection('users').doc(uid).collection('tasks').doc(tasks.currentTaskId);
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

  return (
    <>
      {currentTask ? (
        <Draggable key={currentTask.id} draggableId={currentTask.id} index={0}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className="list-group-item"
            >
              {/* タスク名（上部中央） */}
              <div className="text-center fw-bold mb-2">{currentTask.name}</div>
              
              {/* BatteryとMeterを横並びに配置 */}
              <div className="d-flex align-items-center">
                <Battery commitTime={currentTask.CommitTime} />
                <div className="flex-grow-1 ms-3">
                  <Meter commitTime={currentTask.CommitTime} />
                </div>
              </div>
              
              {/* 締め切り日時 */}
              <div className="mt-2">Deadline: {currentTask.deadline}</div>
            </div>
          )}
        </Draggable>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default CurrentOn;


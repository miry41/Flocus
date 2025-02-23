// src/components/gears/CurrentOn.js
import React, { useEffect, useState } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { db } from '../../firebase'; // Firebaseの設定ファイルをインポート

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
              <div>TaskName: {currentTask.name}</div>
              <div>Status: {currentTask.status}</div>
              <div>Deadline: {currentTask.deadline}</div>
              {/* 他のフィールドも必要に応じて追加 */}
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

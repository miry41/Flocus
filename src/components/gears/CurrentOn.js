// src/components/gears/CurrentOn.js
import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import Task from './Task';

const CurrentOn = ({ tasks }) => {
  return (
    <>
      {tasks.map((task, index) => {
        // 何時間分たまっているか（例: CommitTime=130 → hours=2）
        const hours = Math.floor(task.CommitTime / 60);
        
        // hours が 0 以上の場合のみ表示（例: 2時間 → "🔋2"）
        const batteryIcon = hours > 0 ? `🔋${hours}` : '';

        return (
          <Draggable key={task.id} draggableId={task.id} index={index}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className="list-group-item mb-2"
              >
                {/* バッテリーアイコンを左側に、Task.jsの内容を右側に並べたい場合 */}
                <div className="d-flex align-items-start">
                  {/* 左側にバッテリーアイコンと時間表示 */}
                  <div className="me-3">
                    {batteryIcon && (
                      <div>{batteryIcon}</div>
                    )}
                  </div>
                  {/* 右側に既存の Task.js の表示 */}
                  <div style={{ flex: 1 }}>
                    <Task task={task} />
                  </div>
                </div>
              </div>
            )}
          </Draggable>
        );
      })}
    </>
  );
};

export default CurrentOn;

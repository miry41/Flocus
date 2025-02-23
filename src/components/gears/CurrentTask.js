// src/components/gears/CurrentTask.js
import React, { useState } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import 'bootstrap/dist/css/bootstrap.min.css';
import CurrentOn from './CurrentOn';
import EmptyTask from './EmptyTask';

function CurrentTask() {
  const [currentTask, setCurrentTask] = useState([]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(currentTask);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setCurrentTask(items);
  };

  return (
    <div className="container mt-2">
      <div className="row">
        <div className="col">
          <div className="card">
            {/* カードヘッダーに「着手中」を表示 */}
            <div className="card-header">着手中</div>
            <div className="card-body">
              {/* タスクを配置するための枠 */}
              <div className="border rounded p-2" style={{ minHeight: '150px' }}>
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="currentTask">
                    {(provided) => (
                      <div
                        className="list-group"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {currentTask.length > 0 ? (
                          // タスクがある場合は CurrentOn を表示
                          <CurrentOn tasks={currentTask} />
                        ) : (
                          // タスクがない場合は EmptyTask を表示
                          <EmptyTask />
                        )}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentTask;

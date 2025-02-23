// src/components/gears/CurrentTask.js
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import 'bootstrap/dist/css/bootstrap.min.css';
import CurrentOn from './CurrentOn';
import EmptyTask from './EmptyTask';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

function CurrentTask() {
  const [currentTask, setCurrentTask] = useState([]);
  const [hasTask, setHasTask] = useState(false);
  const [data, setData] = useState({ currentTaskId: "" });

  useEffect(() => {
    const fetchCurrentTask = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const db = getFirestore();
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log("currentTaskId:", data.currentTaskId); // ここで currentTaskId を出力
          setData(data);
          setHasTask(data.currentTaskId !== "");
        }
      }
    };

    fetchCurrentTask();
  }, []);

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
              <div className="border rounded p-2" style={{ minHeight: '130px' }}>
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="currentTask">
                    {(provided) => (
                      <div
                        className="list-group"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {data.currentTaskId === "" ? (
                          // タスクがない場合は EmptyTask を表示
                          <EmptyTask />
                        ) : (
                          // タスクがある場合は CurrentOn を表示
                          <CurrentOn tasks={currentTask} />
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

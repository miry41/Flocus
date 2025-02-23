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
          setData(data);
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
            <div className="card-header">着手中</div>
            <div className="card-body">
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
                          <EmptyTask />
                        ) : (
                          <CurrentOn tasks={data} />
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

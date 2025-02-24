// src/components/gears/CurrentTask.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CurrentOn from './CurrentOn';
import EmptyTask from './EmptyTask';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

function CurrentTask() {
  const [data, setData] = useState({ currentTaskId: "" });

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const db = getFirestore();
      const docRef = doc(db, 'users', user.uid);
      const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          setData(docSnap.data());
        }
      });
      return () => unsubscribe();
    }
  }, []);

  return (
    <div className="container mt-2">
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-header">着手中</div>
            <div className="card-body">
              {data.currentTaskId === "" ? (
                <EmptyTask />
              ) : (
                <CurrentOn tasks={data} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentTask;

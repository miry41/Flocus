//// filepath: /c:/Users/takam/CE/Flocus/flocus/src/components/gears/DoneTasks.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DoneTaskLists from './DoneTaskLists';
import { getAuth } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import Battery from './Battery';
import Meter from './Meter';

function DoneTasks() {
  const [weeklyStudyTime, setWeeklyStudyTime] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    let unsubscribe;

    if (user) {
      const uid = user.uid;
      const docRef = doc(db, 'users', uid);
      // Firestore の /users/{uid} ドキュメントの変更をリアルタイムで監視
      unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setWeeklyStudyTime(data.weeklyStudyTime);
        }
      }, (error) => {
        console.error("Realtime update error:", error);
      });
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return (
    <div className="container mt-2">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              完了
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="card-body">
                  {weeklyStudyTime !== null ? (
                    <div className="d-flex align-items-center">
                      <div style={{ width: '50px', textAlign: 'center' }}>
                        <Battery commitTime={weeklyStudyTime} />
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <Meter commitTime={weeklyStudyTime} />
                      </div>
                      <div className="ms-3 fw-bold">1h</div>
                    </div>
                  ) : (
                    '読み込み中...'
                  )}
                </div>
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <DoneTaskLists />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoneTasks;
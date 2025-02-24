import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';  // firebase の初期設定ファイルのパスに合わせて変更してください
import FllowingUser from './gears/FllowingUser';
import { auth } from '../firebase';
import './style/RightPanel.css'; // CSSファイルをインポート

function RightPanel() {
  const [followingUsers, setFollowingUsers] = useState([]);

  useEffect(() => {
    const fetchFollowingUsers = async () => {
      try {
        const uid = auth.currentUser.uid;  // 実際のユーザーUIDに置き換えてください
        const colRef = collection(db, 'users', uid, 'following');
        const querySnapshot = await getDocs(colRef);
        const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFollowingUsers(users);
      } catch (error) {
        console.error("Error fetching following users: ", error);
      }
    };
    fetchFollowingUsers();
  }, []);

  return (
    <div className="rightPanel h-100">
      <div className="container mt-2">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                週間ランキング
              </div>
              <div className="card-body d-flex flex-column">
                <div className="ranking flex-grow-1 mb-2">
                  １位：ユーザ名
                  {/* ランキング表示部分 */}
                </div>
                <div className="divider-container flex-grow-1 overflow-auto">
                  <hr className="divider my-2" />
                </div>
                <div className="followingUsers flex-grow-1 overflow-auto">
                  {followingUsers.map(user => (
                    <FllowingUser key={user.id} {...user} />
                  ))}
                  a
                  a
                  a
                  a
                  a
                  a
                  a
                  a
                  a
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightPanel;
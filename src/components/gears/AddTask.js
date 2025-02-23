import React from 'react';
import { db } from '../../firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'; // Firestoreを使用するために追加
import '../style/AddTask.css';  // CSSファイルをインポート
import { getAuth } from 'firebase/auth'; // Firebase Authをインポート

function AddTask({ onClose }) {
  const [task, setTask] = React.useState('');
  const [deadline, setDeadline] = React.useState('');

  async function addATask(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        await db.collection('users').doc(user.uid).collection('tasks').add({
          CommitTime: 0,         // CommitTimeを0で固定
          deadline,              // ユーザが入力したタイムスタンプ
          name: task,            // ユーザが入力した文字列
          status: "yet",         // ステータスを "yet" で固定
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        setTask('');
        setDeadline('');
        onClose(); // 正常に追加できた後、ポップアップを閉じる等の処理
      }
    } catch (error) {
      console.error('タスクの追加中にエラーが発生しました:', error);
    }
  }

  return (
    <div className="popupOverlay" onClick={onClose}>
      <div className="popupContent" onClick={(e) => e.stopPropagation()}>
        <button className="closeButton" onClick={onClose}>X</button>
        <h2>タスク追加</h2>
        <form onSubmit={addATask}>
          <div className="AddTask">
            <input
              type="text"
              placeholder="タスクを追加"
              onChange={(e) => setTask(e.target.value)}
              value={task}
            />
          </div>
          <div className="Deadline">
            <label>締め切り：</label>
            <input
              type="datetime-local"
              onChange={(e) => setDeadline(e.target.value)}
              value={deadline}
            />
          </div>
          <button type="submit">追加</button>
        </form>
      </div>
    </div>
  )
}

export default AddTask;
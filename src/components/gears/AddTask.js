import React from 'react'
import { db, auth } from '../../firebase';
import firebase from 'firebase/compat/app';
import '../style/AddTask.css';  // CSSファイルをインポート

function AddTask({ onClose }) {
  const [task, setTask] = React.useState('');
  const [deadline, setDeadline] = React.useState('');
  const [goalTime, setGoalTime] = React.useState('');

  function addATask(e) {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;
    db.collection('tasks').add({
      text: task,
      deadline,     // 締め切り情報を保存
      goalTime,     // 目標達成時間（時間数として入力）を保存
      uid,
      photoURL,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    setTask('');
    setDeadline('');
    setGoalTime('');
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
          <div className="GoalTime">
            <label>目標達成時間（時間）：</label>
            <input
              type="number"
              placeholder="目標達成時間 (時間)"
              onChange={(e) => setGoalTime(e.target.value)}
              value={goalTime}
            />
          </div>
          <button type="submit">追加</button>
        </form>
      </div>
    </div>
  )
}

export default AddTask
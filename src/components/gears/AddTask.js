import React from 'react'
import { db,auth } from '../../firebase';
import firebase from 'firebase/compat/app';

function AddTask() {
  const [task, setTask] = React.useState('');
  function addATask(e) {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;
    db.collection('tasks').add({
        text: task,
        uid,
        photoURL,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    setTask('');
  }
  return (
    <div>
        <form onSubmit={addATask}>
            <div className="AddTask">
                <input type="text" placeholder='タスクを追加' onChange={(e) => setTask(e.target.value)} value={task}/>
            </div>
        </form>
    </div>
  )
}

export default AddTask
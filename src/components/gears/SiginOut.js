import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { auth } from '../../firebase';

function SiginOut() {
  return (
    <div>
        <Button variant="danger" onClick={() => auth.signOut()}>サインアウト</Button>
    </div>
  )
}

export default SiginOut
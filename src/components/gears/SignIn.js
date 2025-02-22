import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import firebase from 'firebase/compat/app';
import React from 'react'
import {auth} from '../../firebase'

function SignIn() {
    function signInWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
    }
  return (
    <div>
      <Button onClick={signInWithGoogle}>googleでログイン</Button>
    </div>
  )
}

export default SignIn
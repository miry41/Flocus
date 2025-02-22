import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAmHB3XbsQpri4CxCEkvCX8-Sy9s9Xs5ms",
  authDomain: "flocus-fd9c0.firebaseapp.com",
  projectId: "flocus-fd9c0",
  storageBucket: "flocus-fd9c0.firebasestorage.app",
  messagingSenderId: "949732130467",
  appId: "1:949732130467:web:fe734868d5e61b76204916",
  measurementId: "G-BZL3KP1HD7"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
export { db, auth };
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAPgP75goA9jQ_kyP0ohs_7PCg6VIbK7Do",
  authDomain: "flocus-85173.firebaseapp.com",
  projectId: "flocus-85173",
  storageBucket: "flocus-85173.firebasestorage.app",
  messagingSenderId: "589779918765",
  appId: "1:589779918765:web:8c8f4d3b5382aee6884b24",
  measurementId: "G-MLJ2DXWPWR"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
export { db, auth };
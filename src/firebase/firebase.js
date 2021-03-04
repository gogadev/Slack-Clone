import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD0cRFv0hxdY6NSOWKwWOVTHpclxbsRb7o",
  authDomain: "slack-clone-b1d53.firebaseapp.com",
  projectId: "slack-clone-b1d53",
  storageBucket: "slack-clone-b1d53.appspot.com",
  messagingSenderId: "488041726146",
  appId: "1:488041726146:web:b160d320c49e28c18d3b5b",
  measurementId: "G-56Q5QZJC62",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

let firebaseConfig = {
  apiKey: "AIzaSyCMrr0HrIpG8ev_KVVv3w9n5rGicNqSMZU",
  authDomain: "grid-it-app.firebaseapp.com",
  projectId: "grid-it-app",
  storageBucket: "grid-it-app.appspot.com",
  messagingSenderId: "531223948375",
  appId: "1:531223948375:web:ef9a1f1c9c28348c06c712",
};

const Firebase = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const db = firebase.firestore();

export const usersDB = db.collection("users");

export const timeStamp = firebase.firestore.FieldValue.serverTimestamp()

export default Firebase;

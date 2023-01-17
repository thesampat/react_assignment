// JavaScript
// src.firebase.js
import { initializeApp, FirebaseApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMHpuOJXgO_V7IxqTHv3Jby3GjzWqnMYw",
  authDomain: "myapp-5d8c3.firebaseapp.com",
  projectId: "myapp-5d8c3",
  storageBucket: "myapp-5d8c3.appspot.com",
  messagingSenderId: "209965700132",
  appId: "1:209965700132:web:82b9667da75e617619b4b1",
  measurementId: "G-QZRDKHH1WC"
};


// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export {db}
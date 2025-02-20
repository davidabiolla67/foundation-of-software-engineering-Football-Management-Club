// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getAuth} from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBA_6MLpROPy_I9EV5eFi0oOg3NC-6Lc-4",
  authDomain: "fire-base-webapp-v2.firebaseapp.com",
  projectId: "fire-base-webapp-v2",
  storageBucket: "fire-base-webapp-v2.firebasestorage.app",
  messagingSenderId: "369895163356",
  appId: "1:369895163356:web:6da15c69ae256a9bf53b19"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth()
export const db = getFirestore(app)

export default app

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8roTM4tCRz0hxs0Odh_NBjOz30K4awtk",
  authDomain: "food-app-1ba4a.firebaseapp.com",
  projectId: "food-app-1ba4a",
  databaseURL:"https://food-app-1ba4a-default-rtdb.firebaseio.com/",
  storageBucket: "food-app-1ba4a.firebasestorage.app",
  messagingSenderId: "1008962153845",
  appId: "1:1008962153845:web:abef4f3256e01fd6c4f73c",
  measurementId: "G-FQ57LV6F22"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
export {app, auth, db};



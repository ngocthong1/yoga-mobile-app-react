// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBViFIkSYJT18jE-x5mhsvwo1J6NESdl8",
  authDomain: "yogaapp-16972.firebaseapp.com",
  databaseURL: "https://yogaapp-16972-default-rtdb.firebaseio.com",
  projectId: "yogaapp-16972",
  storageBucket: "yogaapp-16972.firebasestorage.app",
  messagingSenderId: "103305696000",
  appId: "1:103305696000:web:e0172d55577c3388c399e5",
  measurementId: "G-GMCHDQWE6Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export { database };
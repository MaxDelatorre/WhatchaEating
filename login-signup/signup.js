// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-e8SkDbxXwoc2LAPIDoU98ILFsBXlFh0",
  authDomain: "whatchaeating-a0fff.firebaseapp.com",
  projectId: "whatchaeating-a0fff",
  storageBucket: "whatchaeating-a0fff.firebasestorage.app",
  messagingSenderId: "998941433300",
  appId: "1:998941433300:web:4fade7c81c7702bf1d4a41",
  //measurementId: "G-786VYKP65J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
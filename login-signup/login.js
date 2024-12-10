// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
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

// Initialize Firebase Authentication and get the Auth instance
const auth = getAuth(app);

const loginForm = document.getElementById('loginForm');

loginForm.addEventListener("submit", function (event) {
  event.preventDefault(); 

  const email = document.getElementById('user').value;
  const password = document.getElementById('psw').value;

  // Create the user with email and password
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      //alert("Account created successfully!");
      window.location.href = "../user-file/user-index.html"; 
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);  // Log errors to console
      alert(errorMessage); // Show error message to the user
    });
});

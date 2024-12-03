import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-e8SkDbxXwoc2LAPIDoU98ILFsBXlFh0",
  authDomain: "whatchaeating-a0fff.firebaseapp.com",
  projectId: "whatchaeating-a0fff",
  storageBucket: "whatchaeating-a0fff.firebasestorage.app",
  messagingSenderId: "998941433300",
  appId: "1:998941433300:web:4fade7c81c7702bf1d4a41",
  databaseURL: "https://whatchaeating-a0fff-default-rtdb.firebaseio.com/",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Get the username element
const usernameElement = document.getElementById('username');

// Monitor the authentication state
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, set their email as the username
        const email = user.email;
        const usernameDisplay = email.split('@')[0];
        usernameElement.textContent = usernameDisplay;
    } else {
        // No user is signed in, redirect to the login page
        usernameElement.textContent = "Guest";
    }
});


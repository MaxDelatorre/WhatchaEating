import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, onAuthStateChanged, deleteUser, reauthenticateWithPopup, EmailAuthProvider } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

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

var navLinks = document.getElementById("navLinks");

function showMenu() {
    navLinks.style.right = "0";
}
function hideMenu() {
    navLinks.style.right = "-150px";
}

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
        alert("Error in getting user account");
        window.location.href = "../index.html";
    }
});


// Function to delete user account
async function deleteAccount() {
    console.log("Trying to delete User!");
    const user = auth.currentUser;

    if (!user) {
        alert("No user is signed in.");
        return;
    }

    const confirmation = confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (!confirmation) return;
    
    deleteUser(user).then(() => {
        alert("Your account has been successfully deleted.");
        window.location.href = "../index.html";
      }).catch((error) => {
        console.error("Error deleting account:", error);
        alert("Failed to delete account. Please try again later.");
      });
      ;
}

// Expose the function to the global scope
window.deleteAccount = deleteAccount;
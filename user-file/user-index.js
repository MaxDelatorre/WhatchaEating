import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

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
const db = getDatabase(app);;

const usernameElement = document.getElementById("username");

onAuthStateChanged(auth, (user) => {
    if (user) {
        // The user is signed in
        const userId = user.uid; // Get the unique user ID

        // Reference to the user's data in the 'User_account' collection
        const userRef = ref(db, 'User_account/' + userId); // Assuming 'User_account' is the parent collection

        // Fetch the username from the database
        get(userRef).then((snapshot) => {
            if (snapshot.exists()) {
                const email = snapshot.val().user_name; // Fetch email stored as user_name
                const usernameDisplay = email.split('@')[0]; // Get the part before '@'
                usernameElement.textContent = usernameDisplay; // Set the username in the navigation bar
            } else {
                console.log("No username found");
                usernameElement.textContent = "Guest"; // Fallback if no username is found
            }
        }).catch((error) => {
            console.error("Error fetching data: ", error);
            usernameElement.textContent = "Error";
        });
    } else {
        // No user is signed in, handle accordingly
        usernameElement.textContent = "Guest";
    }
});

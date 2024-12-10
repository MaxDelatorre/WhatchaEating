import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
  };

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);

  export const register =(email, password) => {
    return createUserWithEmailAndPassword(auth, email, password).then(
        (response) => updateProfile (response.user, {display_name: email.split('@')[0]})
    );
  };
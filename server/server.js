const express = require('express'); // Simplifies creating web servers and APIs (Routing, Middleware, Static File Serving)
const bcrypt = require('bcrypt'); // Password-hashing library (Hashing Compare, Salt) 
const bodyParser = require('body-parser'); //  Parse the body of incoming HTTP requests (Parses JSON, Parses URL-encoded data)
const cors = require('cors'); // (Cross-Origin Resource Sharing) Security feature of web browsers that restricts web pages 
                              // from making requests to a different domain than the one that served the web page
const path = require('path'); // Import path for resolving file paths
const userDB = require('./user_db'); // Import user_db.js

const app = express();
const router =  express.Router();
const PORT = 3100;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); // Used to configure the Express application to parse
                                                    // incoming requests with URL-encoded payloads
app.use(bodyParser.json());                         

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, '../')));

// Handle user sign-up
app.post('/signup', async (req, res) => {
    const { user: username, psw: password } = req.body; // Get username and password from form data

    if (!username || !password) {
        res.status(400).send('Username and password are required.');
        return //res.redirect('../login-signup/signup.html');
    }

    // Add user to the database
    try {
        const result = await userDB.addUser(username, password);
        if (result === 'User successfully added!') {
            //return res.redirect('../user-file/user-index.html'); // Redirect to user-index.html on success
            return res.send(`
                    <script>
                        localStorage.setItem('username', '${username}');
                        window.location.href = '../user-file/user-index.html'; // Redirect to user-index.html
                    </script>
                
            `);
        } else {
            return res.status(400).send(result); // Send the error message if username exists
        }
    } catch (error) {
        res.status(500).send('An error occurred while adding the user.');
    }
});

// Handle user login
app.post('/login', async (req, res) => {
    const { User: username, psw: password } = req.body; // Get username and password from form data

    if (!username || !password) {
        res.status(400).send('Username and password are required.');
        return //res.redirect('../login-signup/login.html');
    }

    // Validate user credentials
    try {
        const isValidUser = await userDB.validateUser(username, password);
        if (isValidUser) {
            return res.redirect('../user-file/user-index.html'); // Redirect on successful login
        } else {
            return res.status(400).send('Invalid username or password.'); // Return error if invalid
        }
    } catch (error) {
        res.status(500).send('An error occurred during login.');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

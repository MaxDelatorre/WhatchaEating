const express = require('express'); // Simplifies creating web servers and APIs (Routing, Middleware, Static File Serving)
const bcrypt = require('bcrypt'); // Password-hashing library (Hashing Compare, Salt) 
const bodyParser = require('body-parser'); //  Parse the body of incoming HTTP requests (Parses JSON, Parses URL-encoded data)
const cors = require('cors'); // (Cross-Origin Resource Sharing) Security feature of web browsers that restricts web pages 
                              // from making requests to a different domain than the one that served the web page
const path = require('path'); // Import path for resolving file paths

const app = express();
const PORT = 3100;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); // Used to configure the Express application to parse
                                                    // incoming requests with URL-encoded payloads
app.use(bodyParser.json());                         

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, '../')));

// In-memory user storage 
let users = []; //Will restart when server stops

// Handle user sign-up
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    // Check if the user already exists
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).send('Username already taken');
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Save the user
    users.push({ username, password: hashedPassword });

    res.redirect('/user-file/user-index.html');
});

// Handle user login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Find the user
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(400).send('Invalid username or password');
    }

    // Compare the password with the stored hashed password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        res.status(400).send('Invalid username or password');
    }

    res.redirect('/user-file/user-index.html');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on https://localhost:${PORT}`);
});

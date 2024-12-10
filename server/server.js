const express = require('express'); // Simplifies creating web servers and APIs (Routing, Middleware, Static File Serving)
const bodyParser = require('body-parser'); //  Parse the body of incoming HTTP requests (Parses JSON, Parses URL-encoded data)
const cors = require('cors'); // (Cross-Origin Resource Sharing) Security feature of web browsers that restricts web pages 
                              // from making requests to a different domain than the one that served the web page
const path = require('path'); // Import path for resolving file paths
//const userDB = require('./user_db'); // Import user_db.js

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

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

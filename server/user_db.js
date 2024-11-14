// user_db.js

const bcrypt = require('bcrypt'); // Use bcrypt for secure password hashing

// In-memory user database
const users = new Map(); // Map to hold username-password pairs for uniqueness

/**
 * Adds a new user to the in-memory database.
 * @param {string} username - The user's username.
 * @param {string} password - The user's password.
 * @returns {string} - Success or error message.
 */
async function addUser(username, password) {
    // Check for existing username
    if (users.has(username)) {
        return Promise.resolve('Username already exists. Choose a different username.');
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    users.set(username, hashedPassword);
    return Promise.resolve('User successfully added!');
}

/**
 * Checks if a username already exists in the database.
 * @param {string} username - The username to check.
 * @returns {boolean} - True if the username exists, false otherwise.
 */
function userExists(username) {
    return users.has(username);
}

/**
 * Retrieves a user's hashed password by username.
 * @param {string} username - The username to retrieve.
 * @returns {string|null} - The hashed password, or null if the user does not exist.
 */
function getUserPassword(username) {
    return users.get(username) || null;
}

/**
 * Validates the user's password against the stored hashed password.
 * @param {string} username - The username of the user trying to log in.
 * @param {string} password - The password entered by the user.
 * @returns {Promise<boolean>} - Returns true if the password matches, false otherwise.
 */
async function validateUser(username, password) {
    const hashedPassword = getUserPassword(username);
    if (!hashedPassword) {
        return false; // User does not exist
    }
    return await bcrypt.compare(password, hashedPassword); // Compare entered password with hashed password
}

module.exports = {
    addUser,
    userExists,
    getUserPassword,
    validateUser, // Export the new validateUser function
};
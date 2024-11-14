// Retrieve username from local storage
const username = localStorage.getItem('username') || 'Guest'; // Assuming username is stored in local storage, defaults to Guest

document.getElementById('username').textContent = username; // Update the username in the link

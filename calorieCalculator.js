var navLinks = document.getElementById("navLinks");
function showMenu(){
    navLinks.style.right = "0";
}
function hideMenu(){
    navLinks.style.right = "-150px";
}

 // Placeholder food database (example)
 const foodDatabase = [
{ name: "Apple", calories: 95 },
{ name: "Banana", calories: 105 },
{ name: "Carrot", calories: 41 },
{ name: "Doughnut", calories: 195 },
{ name: "Egg", calories: 68 },
{ name: "Fried Rice", calories: 238 },
{ name: "Grapes", calories: 104 },
{ name: "Hamburger", calories: 354 },
{ name: "Ice Cream", calories: 207 },
{ name: "Juice", calories: 112 },
{ name: "Kale", calories: 33 },
{ name: "Lettuce", calories: 5 },
{ name: "Mango", calories: 150 },
{ name: "Nuts", calories: 200 },
{ name: "Orange", calories: 62 },
{ name: "Pizza", calories: 285 },
{ name: "Quinoa", calories: 222 },
{ name: "Rice", calories: 206 },
{ name: "Salad", calories: 20 },
{ name: "Tomato", calories: 22 },
{ name: "Yogurt", calories: 154 }
];

// Function to calculate calories based on user input
function calculateCalories() {
var foodItem = document.getElementById("foodItem").value.toLowerCase(); // Convert to lowercase
var resultText = "No results found."; // Default result message

// Search in the database
for (var i = 0; i < foodDatabase.length; i++) {
    // Compare lowercase values
    if (foodDatabase[i].name.toLowerCase() === foodItem) {
        resultText = foodDatabase[i].name + " has " + foodDatabase[i].calories + " calories.";
        break; // Exit loop if found
    }
}

// Display results
document.getElementById("results").innerText = resultText; 
}

// Button click event for searching
document.getElementById("searchBtn").onclick = function() {
calculateCalories(); // Call the function on button click
}
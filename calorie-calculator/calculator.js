//empty arrays to hold information
let trackedFoods = [];
let currentFood = null;
//handles the choice of using 'a' or 'an' depending on the first letter of the food name
function getArticle(foodName) {
    return /^[aeiou]/i.test(foodName) ? 'an' : 'a';
}
//if no input, page is blank else input, calculator is displayed
function showContainerIfContent() {
    const container = document.querySelector('.container');
    const resultDiv = document.getElementById('result');
    container.style.visibility = resultDiv.innerHTML.trim() !== '' ? 'visible' : 'hidden';
}
//handles the calculation to then suggest jogging time to burn x amount of calories
function calculateJoggingMinutes(calories) {
    return (calories / 13).toFixed(2); //assumed 13 calories burned per minute jogging
}
//used for styling purpoes, seperates the food name and its nutrient information to be styled seperately 
function updateField(id, label, value, unit = '') {
    document.getElementById(id).innerHTML = `<span class="label">${label}:</span> <span class="value">${value} ${unit}</span>`;
}
//api requests, fetches information
function fetchFoodData(foodItem) {
    const apiUrl = 'https://trackapi.nutritionix.com/v2/natural/nutrients';
    const apiKey = 'e88eee93d9f28ac856e2af2f2ebdc642';
    const appId = 'a7b8cad6';

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'x-app-id': appId,
            'x-app-key': apiKey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: foodItem })
    })
    .then(response => response.json())
    .then(data => {
        if (data.foods && data.foods.length > 0) {
            displayFoodData(data.foods[0]);
        } else {
            handleNoData();
        }
    })
    .catch(handleFetchError);
}
//creates the chart using the information from the api
function renderNutrientChart(data) {
    const ctx = document.getElementById('nutrientChart').getContext('2d');
    const labels = [
        'Protein', 'Fats', 'Carbohydrates', 'Sodium', 'Sugar', 
        'Cholesterol', 'Saturated Fat'
    ];
    const values = [
        data.nf_protein, data.nf_total_fat, data.nf_total_carbohydrate,
        data.nf_sodium, data.nf_sugars, data.nf_cholesterol,
        data.nf_saturated_fat
    ];

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Nutritional Values',
                data: values,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
        responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
//function to add currently displayed food item into tracking container
function updateTrackingContainer() {
    const foodList = document.getElementById('tracked-food-list');
    foodList.innerHTML = ''; // Clear previous entries

    // Loop through tracked foods and display each one
    trackedFoods.forEach((food, index) => {
        const foodItem = document.createElement('div');
        foodItem.classList.add('tracked-food-item');
        foodItem.innerHTML = `
            <h3>${index + 1}. ${food.food_name}</h3>
            <p>Calories: ${food.nf_calories} kcal</p>
            <p>Protein: ${food.nf_protein} g</p>
            <p>Fats: ${food.nf_total_fat} g</p>
            <p>Carbohydrates: ${food.nf_total_carbohydrate} g</p>
            <p>Sodium: ${food.nf_sodium} mg</p>
            <p>Sugar: ${food.nf_sugars} g</p>
            <p>Cholesterol: ${food.nf_cholesterol} mg</p>
            <p>Saturated Fat: ${food.nf_saturated_fat} g</p>
            <p>Potassium: ${food.nf_potassium} mg</p>
        `;
        foodList.appendChild(foodItem);
    });
}
//locally saves tracked foods to local storage so it isn't deleted upon reload/refresh
function saveTrackedFoods() {
    localStorage.setItem('trackedFoods', JSON.stringify(trackedFoods));
}
//once saved, if reloaded, will display saved items back into the container
function loadTrackedFoods() {
    const savedFoods = localStorage.getItem('trackedFoods');
    if (savedFoods) {
        trackedFoods = JSON.parse(savedFoods);
        updateTrackingContainer(); // Render tracked foods
        showTrackingContainer(); // Show the container if it has items
    }
}
//if populated, tracked food container shows
function showTrackingContainer() {
    const trackingContainer = document.getElementById('tracking-container');
    trackingContainer.style.display = trackedFoods.length > 0 ? 'block' : 'none';
}
//adds desired food item into empty array to then be displayed
function addFoodToTracking() {
    if (currentFood) {
        trackedFoods.push(currentFood); // Add to tracked list
        updateTrackingContainer(); // Update displayed list
        saveTrackedFoods(); // Save updated list to localStorage
        showTrackingContainer(); // Make sure container is visible
    } else {
        console.log("No food item to add");
    }
}
//populates fields with the information from the fetch requests
function displayFoodData(food) {
    const article = getArticle(food.food_name);
    const joggingMinutes = calculateJoggingMinutes(food.nf_calories);
    currentFood = food;
    
    updateField('serving_size', 'Serving Size', food.serving_weight_grams, 'g');
    updateField('calories', 'Calories', food.nf_calories);
    updateField('protein', 'Protein', food.nf_protein, 'g');
    updateField('fats', 'Fats', food.nf_total_fat, 'g');
    updateField('saturated-fat', 'Saturated Fat', food.nf_saturated_fat, 'g');
    updateField('carbohydrates', 'Carbohydrates', food.nf_total_carbohydrate, 'g');
    updateField('sodium', 'Sodium', food.nf_sodium, 'mg');
    updateField('sugar', 'Sugar', food.nf_sugars, 'g');
    updateField('cholesterol', 'Cholesterol', food.nf_cholesterol, 'mg');
    updateField('potassium', 'Potassium', food.nf_potassium, 'mg');

    document.getElementById('calorie-summary').innerHTML = `There are a total of ${food.nf_calories} calories in ${article} ${food.food_name}. <img src="${food.photo.highres}" alt="${food.food_name}">`;
    document.getElementById('burn-calories').innerHTML = `To burn ${food.nf_calories} calories you will have to...`;
    document.getElementById('jogging-time').innerHTML = `Jog for approximately ${joggingMinutes} minutes.`;

    renderNutrientChart(food);
    showContainerIfContent();
}
//displays a message if no data is found, whether the food
function handleNoData() {
    document.getElementById('result').innerHTML = '<p>No data found for that food item. Try checking your spelling.</p>';
    document.getElementById('calorie-summary').innerHTML = '';
    showContainerIfContent();
}
//if API crashes due to its limitations from using free version, lets the user know to try again later
function handleFetchError(error) {
    console.error('Error fetching data:', error);
    document.getElementById('result').innerHTML = '<p>There was an error retrieving the data.</p>';
    document.getElementById('calorie-summary').innerHTML = '';
    showContainerIfContent();
}
//temporarily stores information locally for a refresh after every use
document.getElementById('calorie-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const foodItem = document.getElementById('food').value.trim();
    sessionStorage.setItem("foodQuery", foodItem);
    location.reload();
});
//clears the storage after it was used.
window.addEventListener("load", function() {
    loadTrackedFoods();
    const foodItem = sessionStorage.getItem("foodQuery");
    if (!foodItem) return;
    sessionStorage.removeItem("foodQuery");
    fetchFoodData(foodItem);
});
//logic for reset button, when clicked clears local storage allowing full reset
document.getElementById('reset-button').addEventListener('click', function() {
    // Clear localStorage and reset the tracking data
    localStorage.clear();
    trackedFoods = [];
    updateTrackingContainer(); // Clear displayed tracked items
    showTrackingContainer(); // Hide the tracking container

    // Clear input field and reset display elements
    document.getElementById('food').value = '';
    document.getElementById('result').innerHTML = '';
    document.getElementById('calorie-summary').innerHTML = '';
    document.getElementById('burn-calories').innerHTML = '';
    document.getElementById('jogging-time').innerHTML = '';
    
    // Hide the main container if necessary
    showContainerIfContent();
    console.log("All data cleared.");
});
//logic for add button
document.getElementById('add-form').addEventListener('submit', function(e) {
    e.preventDefault();
    addFoodToTracking();
});

//TESTING AREA CAN DELETE AFTER IF THINGS GO SOUTH
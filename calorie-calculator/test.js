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
//handles local requests from data base to grab information, simulates real api behavior
function fetchFoodData(foodItem) {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const food = data.find(item => item.food_name.toLowerCase() === foodItem.toLowerCase());
            if (food) {
                displayFoodData(food);
            } else {
                handleNoData();
            }
        })
        .catch(handleFetchError);
}
//populates fields with the information from the fetch requests
function displayFoodData(food) {
    const article = getArticle(food.food_name);
    const joggingMinutes = calculateJoggingMinutes(food.nf_calories);
    
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
    const foodItem = sessionStorage.getItem("foodQuery");
    if (!foodItem) return;
    sessionStorage.removeItem("foodQuery");
    fetchFoodData(foodItem);
});
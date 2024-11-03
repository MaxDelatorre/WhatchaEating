function getArticle(foodName) {
    const firstLetter = foodName.charAt(0).toLowerCase();
    if (['a', 'e', 'i', 'o', 'u'].includes(firstLetter)) {
        return 'an';
    } else {
        return 'a';
    }
}
function showContainerIfContent() {
    const container = document.querySelector('.container');
    const resultDiv = document.getElementById('result');

    // checks if resultDiv has content
    if (resultDiv.innerHTML.trim() !== '') {
        container.style.visibility = 'visible'; // if content container shows
    } else {
        container.style.visibility = 'hidden'; // if no content container hidden
    }
}
function calculateJoggingMinutes(calories) {
    const caloriesPerMinute = 13; // 13 calories burned per minute of jogging
    return (calories / caloriesPerMinute).toFixed(2); // Returns the time in minutes, rounded to 2 decimal places
}

document.getElementById('calorie-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const foodItem = document.getElementById('food').value.trim();
    sessionStorage.setItem("foodQuery", foodItem);
    location.reload();
});

window.addEventListener("load", function() {
    const foodItem = sessionStorage.getItem("foodQuery");
    if (!foodItem) return; // No action if no food item is present

    // Clear sessionStorage
    sessionStorage.removeItem("foodQuery");

    const apiUrl = 'https://trackapi.nutritionix.com/v2/natural/nutrients';
    const apiKey = 'e88eee93d9f28ac856e2af2f2ebdc642';
    const appId = 'a7b8cad6';
    const resultDiv = document.getElementById('result');
    const summaryDiv = document.getElementById('calorie-summary');
    const foodImageDiv = document.getElementById('food-image');
    const container = document.querySelector('.container');
    const joggingTimeDiv = document.getElementById('jogging-time');
    const burncaloriesDiv = document.getElementById('burn-calories');

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
            const food = data.foods[0];
            const article = getArticle(food.food_name);
            const joggingMinutes = calculateJoggingMinutes(food.nf_calories);
            
                //document.getElementById('food-name').innerHTML = `<h2>${food.food_name}</h2>`;
                document.getElementById('calories').innerHTML = `<span class="label">Calories:</span> <span class="value">${food.nf_calories}</span>`;
                document.getElementById('protein').innerHTML = `<span class="label">Protein:</span> <span class="value">${food.nf_protein} g</span>`;
                document.getElementById('fats').innerHTML = `<span class="label">Fats:</span> <span class="value">${food.nf_total_fat} g</span>`;
                document.getElementById('saturated-fat').innerHTML = `<span class="label">Saturated Fat:</span> <span class="value">${food.nf_saturated_fat} g</span>`;
                document.getElementById('carbohydrates').innerHTML = `<span class="label">Carbohydrates:</span> <span class="value">${food.nf_total_carbohydrate} g</span>`;
                document.getElementById('sodium').innerHTML = `<span class="label">Sodium:</span> <span class="value">${food.nf_sodium} mg</span>`;
                document.getElementById('sugar').innerHTML = `<span class="label">Sugar:</span> <span class="value">${food.nf_sugars} g</span>`;
                document.getElementById('cholesterol').innerHTML = `<span class="label">Cholesterol:</span> <span class="value">${food.nf_cholesterol} g</span>`;
                document.getElementById('potassium').innerHTML = `<span class="label">Potassium:</span> <span class="value">${food.nf_potassium} g</span>`;
                document.getElementById('serving_size').innerHTML = `<span class="label">Serving Size:</span> <span class="value">${food.serving_weight_grams} g</span>`;
            
                summaryDiv.innerHTML = `There are a total of ${food.nf_calories} calories in ${article} ${food.food_name}. <img src="${food.photo.highres}" alt="${food.food_name}">`;
                burncaloriesDiv.innerHTML = `To burn ${food.nf_calories} calories you will have to...`;
                joggingTimeDiv.innerHTML = `jog for approximately ${joggingMinutes} minutes.`;
            // Call the function to show the container if content exists
                showContainerIfContent();
            } else {
                resultDiv.innerHTML = '<p>No data found for that food item. Try checking your spelling.</p>';
                foodImageDiv.innerHTML = '';
                summaryDiv.innerHTML = '';
                showContainerIfContent(); // Call to ensure container is hidden
        }
           
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            resultDiv.innerHTML = '<p>There was an error retrieving the data.</p>';
            summaryDiv.innerHTML = '';
            showContainerIfContent();
        });
});


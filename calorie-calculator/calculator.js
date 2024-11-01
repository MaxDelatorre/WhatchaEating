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
    const servingSizeDiv = document.getElementById('serving_size');
    const container = document.querySelector('.container');

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
        console.log(data);
        if (data.foods && data.foods.length > 0) {
            const food = data.foods[0];
            const article = getArticle(food.food_name);

            document.getElementById('food-name').innerHTML = `<h2>${food.food_name}</h2>`;
            document.getElementById('calories').innerHTML = `<p>Calories: <span>${food.nf_calories} kcals</span></p>`;
            document.getElementById('protein').innerHTML = `<p>Protein: <span>${food.nf_protein} g</span></p>`;
            document.getElementById('fats').innerHTML = `<p>Fats: ${food.nf_total_fat} g</p>`;
            document.getElementById('carbohydrates').innerHTML = `<p>Carbohydrates: ${food.nf_total_carbohydrate} g</p>`;
            document.getElementById('sodium').innerHTML = `<p>Sodium: ${food.nf_sodium} mg</p>`;
            document.getElementById('sugar').innerHTML = `<p>Sugar: ${food.nf_sugars} g</p>`;
            document.getElementById('food-image').innerHTML = `<img src="${food.photo.highres}" alt="${food.food_name} image">`;
            servingSizeDiv.style.display = 'flex';
            servingSizeDiv.innerHTML = `Serving Size: ${food.serving_weight_grams} g`;
            
            summaryDiv.innerHTML = `There are a total of ${food.nf_calories} calories in ${article} ${food.food_name}. <img src="${food.photo.highres}" alt="${food.food_name}">`;

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


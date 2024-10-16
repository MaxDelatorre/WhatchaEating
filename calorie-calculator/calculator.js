document.getElementById('calorie-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const foodItem = document.getElementById('food').value.trim();
    
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
        body: JSON.stringify({
            query: foodItem
        })
    })
    .then(response => response.json())
    .then(data => {
    console.log(data);
    const resultDiv = document.getElementById('result');
        if (data.foods && data.foods.length > 0) {
            const food = data.foods[0];
            resultDiv.innerHTML = `
                <h2>${food.food_name}</h2>
                <p>Calories: ${food.nf_calories} kcal</p>
                <p>Protein: ${food.nf_protein} g</p>
                <p>Fats: ${food.nf_total_fat} g</p>
                <p>Carbohydrates: ${food.nf_total_carbohydrate} g</p>
                <p>Sodium: ${food.nf_sodium} g</p>
                <p>Sugar: ${food.nf_sugars} g</p>
                <img src="${food.photo.highres}">
            `;
        } else {
            resultDiv.innerHTML = '<p>No data found for that food item.</p>';
            foodImageDiv.innerHTML = '';
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        document.getElementById('result').innerHTML = '<p>There was an error retrieving the data.</p>';
    });
});

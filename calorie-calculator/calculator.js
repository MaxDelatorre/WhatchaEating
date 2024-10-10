document.getElementById('calorie-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const foodItem = document.getElementById('food').value.trim();
    
    const apiUrl = 'https://trackapi.nutritionix.com/v2/natural/nutrients';
    const apiKey = 'e88eee93d9f28ac856e2af2f2ebdc642';  // Your API key
    const appId = 'a7b8cad6';  // Your Application ID

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
    console.log(data); // Log the entire response data
    const resultDiv = document.getElementById('result');
    // rest of your code...
        if (data.foods && data.foods.length > 0) {
            const food = data.foods[0];
            resultDiv.innerHTML = `
                <h2>${food.food_name}</h2>
                <p>Calories: ${food.nf_calories} kcal</p>
                <p>Protein: ${food.nf_protein} g</p>
                <p>Fat: ${food.nf_total_fat} g</p>
                <p>Carbohydrates: ${food.nf_total_carbohydrate} g</p>
            `;
        } else {
            resultDiv.innerHTML = '<p>No data found for that food item.</p>';
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        document.getElementById('result').innerHTML = '<p>There was an error retrieving the data.</p>';
    });
});

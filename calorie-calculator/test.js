function getArticle(foodName) {
    const firstLetter = foodName.charAt(0).toLowerCase();
    return ['a', 'e', 'i', 'o', 'u'].includes(firstLetter) ? 'an' : 'a';
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
    sessionStorage.removeItem("foodQuery");


    const resultDiv = document.getElementById('result');
    const summaryDiv = document.getElementById('calorie-summary');
    const foodImageDiv = document.getElementById('food-image');
    const container = document.querySelector('.container');
    const burncaloriesDiv = document.getElementById('burn-calories');

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const food = data.find(item => item.food_name.toLowerCase() === foodItem);
            if (food) {
                const article = getArticle(food.food_name);
                
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
                burncaloriesDiv.innerHTML = `To burn ${food.nf_calories} calories, you will have to...`;
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

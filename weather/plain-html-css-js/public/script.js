document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
  
    const city = document.querySelector('#city').value;
    
    fetch(`http://localhost:3000/weather?city=${city}`)
      .then(response => response.json())
      .then(data => {
        // Do something with the weather data
        console.log(data);
        const weatherList = document.querySelector('#weather-list');

        // Clear previous weather data
        weatherList.innerHTML = '';

        // Create list items for temperature, humidity, and condition
        const tempItem = document.createElement('li');
        tempItem.textContent = `Temperature: ${Math.floor(data.temperature)}°C`;

        const humidityItem = document.createElement('li');
        humidityItem.textContent = `Humidity: ${data.humidity}%`;

        const conditionItem = document.createElement('li');
        conditionItem.textContent = `Condition: ${data.condition}`;

        // Append list items to the weather list
        weatherList.appendChild(tempItem);
        weatherList.appendChild(humidityItem);
        weatherList.appendChild(conditionItem);
      })
      .catch(error => {
        // Handle the error
        console.error('Error:', error);
      });
  });

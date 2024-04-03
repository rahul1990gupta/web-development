import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    if (city) {
      axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY`)
        .then(response => {
          setWeatherData(response.data);
        })
        .catch(error => {
          console.error("Error fetching weather data", error);
        });
    }
  }, [city]);

  return (
    <div>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={e => setCity(e.target.value)}
      />
      {weatherData && (
        <div>
          <p>Temperature: {weatherData.main.temp}</p>
          <p>Humidity: {weatherData.main.humidity}</p>
          <p>Conditions: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
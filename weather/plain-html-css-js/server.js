const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;

const apiKey = "f66400d59f00c591e5f3966c917f29da"; // Replace with your actual API key
  
// fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)


app.get('/weather', (req, res) => { 
    const city = req.query.city;

    axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: city,
        appid: apiKey,
        units: 'metric'
        }
    })
    .then(response => {
        const data = response.data;
        res.json({ 
            temperature: data.main.temp, 
            condition: data.weather[0].main,
            humidity: data.main.humidity
        });
        // res.json(data);
    })
    .catch(error => {
        console.log('Error:', error);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


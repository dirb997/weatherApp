import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const apiKey = process.env.API_KEY;

if (!apiKey) {
    console.error("API key is missing. Please set the environment variable.");
    process.exit(1);
}

app.use(express.static('public'));

app.get('/', async(req, res) => {
    const cityName = req.query.city;

    if(!cityName) {
        return res.status(400).json({ error: "City name is required." });
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${apiKey}&units=metric`);
        const data = await response.json();

        if(response.ok){
            const temp = Math.round(data.main.temp)
            const description = data.weather[0].description;
            const icon = data.weather[0].icon;
            const explanationDetails = [
                `Now feeling: ${Math.round(data.main.feels_like)} °C`,
                `Humidity: ${data.main.humidity}%`,
                `Wind speed: ${data.wind.speed} m/s`
            ];
            res.json({temp, description, icon, explanationDetails});
        } else {
            res.status(404).json({ error: "City not found. Please try another location."})
        }
    } catch (error) {
        console.error("Error fetching the data: ",  error);
        res.status(500).json({ error: "Error retrieving the weather data. Please try again later."})
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT}`);
    console.log("Access point: http://localhost:3000");
})
import express from 'express';
import fetch from 'node-fetch';

const app = express();
const apiKey = "40c700a7b663f15c44c7bad71e3eb661";

app.use(express.static('public'));
app.get('/weather', async(req, res) => {
    const cityName = req.query.city;
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${apiKey}&units=metric`);
        const data = await response.json();

        if(res.ok){
            const temp = Math.round(data.main.temp)
            const description = data.weather[0].description;
            const icon = data.weather[0].icon;
            const explanationDetails = [
                `Now feeling: ${Math.round(data.main.feels_like)} °C`,
                `Humidity: ${data.main.humidity}%`,
                `Wind speed: ${data.wind.speed} m/s`
            ];
            res.json({temp, description, icon, explanationDetails});
        }else{
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
    console.log("Access point: localhost:3000");
})
const apiKey = "40c700a7b663f15c44c7bad71e3eb661";
const weatherData = document.getElementById('weather-data');
const cityName = document.getElementById('cityName')
const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const cityNameValue = cityName.value;
    getWeatherData(cityNameValue);
})

async function getWeatherData(cityNameValue){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityNameValue}&APPID=${apiKey}&units=metric`);
        const data = await response.json()
        const temp = Math.round(data.main.temp)
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const explanationDetails = [
            `Now feeling: ${Math.round(data.main.feels_like)} °C`,
            `Humidity: ${data.main.humidity}%`,
            `Wind speed: ${data.wind.speed} m/s`
        ];
        weatherData.querySelector('.icon').innerHTML = `<img src='http://openweathermap.org/img/wn/${icon}.png' alt="weather_icon">`;
        weatherData.querySelector('.temperature').textContent = `${temp}°C`
        weatherData.querySelector('.explanation').textContent = description
        weatherData.querySelector('.deepInfo').innerHTML = explanationDetails.map(
            (detail)=>`<div>${detail}</div>`
        ).join('')
    } catch (error) {
        console.error("Error fetching the data: ",  error)
        weatherData.innerHTML = `<div class='error-message' style="font-size: 16px">Error retrieving the weather data. Please input a valid location.</div>`
    }
}
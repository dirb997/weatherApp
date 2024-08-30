
document.addEventListener('DOMContentLoaded', () => {
    const weatherData = document.getElementById('weather-data');
    const cityName = document.getElementById('cityName');
    const form = document.querySelector('form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const cityNameValue = cityName.value;

        try {
            const response = await fetch(`/weather?city=${encodeURIComponent(cityNameValue)}`);
            const data = await response.json();

            if (response.ok) {
                const temp = data.temp;
                const description = data.description;
                const icon = data.icon;
                const explanationDetails = data.explanationDetails;

                weatherData.querySelector('.icon').innerHTML = `<img src='http://openweathermap.org/img/wn/${icon}.png' alt="weather_icon">`;
                weatherData.querySelector('.temperature').textContent = `${temp}°C`;
                weatherData.querySelector('.explanation').textContent = description;
                weatherData.querySelector('.deepInfo').innerHTML = explanationDetails.map(
                    detail => `<div>${detail}</div>`
                ).join('');
            } else {
                weatherData.innerHTML = `<div class='error-message' style="font-size: 16px">Error retrieving the weather data. Please input a valid location.</div>`;
            }
        } catch (error) {
            console.error("Error fetching the data: ", error);
            weatherData.innerHTML = `<div class='error-message' style="font-size: 16px">Error retrieving the weather data. Please try again later.</div>`;
        }
    });
});
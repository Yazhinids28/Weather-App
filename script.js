const apiKey = "249b26a696dd3b7518948922c20e7622"; // Replace with your correct OpenWeatherMap API key

// Fetch weather data
async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();

    if (city === "") {
        alert("Please enter a city name!");
        return;
    }

    // Correct URL without unnecessary ":1"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error("Invalid API key! Please check your API key.");
            } else if (response.status === 404) {
                throw new Error("City not found! Please enter a valid city.");
            } else {
                throw new Error("Unable to fetch weather data. Please try again later.");
            }
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert(error.message);
    }
}

// Display weather details
function displayWeather(data) {
    const weatherInfo = document.getElementById("weatherInfo");
    const { name, main, weather, wind, sys } = data;

    weatherInfo.innerHTML = `
        <h2>${name}, ${sys.country}</h2>
        <p>🌡️ Temperature: ${main.temp.toFixed(1)}°C</p>
        <p>☁️ Condition: ${weather[0].description}</p>
        <p>💧 Humidity: ${main.humidity}%</p>
        <p>💨 Wind Speed: ${wind.speed} m/s</p>
    `;
}

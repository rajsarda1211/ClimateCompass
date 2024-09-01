const apiKey = "37d749ae180edfe18ee1a7b4ed5a9b26";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        const weatherType = data.weather[0].main;
        const weatherIconCode = data.weather[0].icon; // Get the icon code from the API response
        document.querySelector(".weather-type").innerHTML = weatherType;

        // Set the weather icon using OpenWeatherMap's icon URL
        weatherIcon.src = `https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}


searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})


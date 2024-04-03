const apiKey = "c8526c88902f722324cc57bb67f429a5";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await response.json();

    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
    document.querySelector(".sunrise").innerHTML = new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour12: true });
    document.querySelector(".sunset").innerHTML = new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', { hour12: true });


    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";


    if (data.weather && data.weather.length > 0) {
      const weatherMain = data.weather[0].main;
      switch (weatherMain) {
        case "Clouds":
          weatherIcon.src = "cloudy-bg.png";
          break;
        case "Mist":
          weatherIcon.src = "mist-bg.png";
          break;
        case "Rain":
          weatherIcon.src = "rainy-bg.png";
          break;
        case "Drizzle":
          weatherIcon.src = "drizzle-bg.png";
          break;
        case "Clear":
          weatherIcon.src = "sunny-bg.png";
          break;
        case "Snow":
          weatherIcon.src = "snow-bg.png";
          break;
        case "Wind":
          weatherIcon.src = "wind-bg.png";
          break;
        case "Thunderstorm":
          weatherIcon.src = "thunderstorm-bg.png";
          break;
        default:
          // Set a default icon for unknown weather conditions
          weatherIcon.src = "weather.png";
          break;
      }
    } else {
      console.error("No weather data found");
    }

  }

}


searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});




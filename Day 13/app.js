const api = "";
const cityInput = document.querySelector("#city");

function fetchWeatherForecast(city) {
  const api_link = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api}&units=metric`;

  fetch(api_link)
    .then((res) => res.json())
    .then((data) => {
      const forecastData = groupForecastByDay(data.list);
      console.log(data.list);
      displayForecast(forecastData);
    })
    .catch((error) => {
      console.error("Error fetching forecast:", error);
    });
}

function groupForecastByDay(forecastData) {
  const groupedForecast = {};
  forecastData.forEach((forecast) => {
    const date = new Date(forecast.dt * 1000);
    const day = date.toISOString().split("T")[0];

    if (!groupedForecast[day]) {
      groupedForecast[day] = forecast;
    }
  });
  return Object.values(groupedForecast);
}

function displayForecast(forecastData) {
  const forecastSection = document.getElementById("forecast");
  forecastSection.innerHTML = "";

  forecastData.forEach((forecast) => {
    const date = new Date(forecast.dt * 1000);
    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });

    const forecastElement = document.createElement("div");
    forecastElement.classList.add("forecast-item");
    forecastElement.innerHTML = `
            <h3>${dayOfWeek}</h3>
            <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="weather icon">
            <p>${forecast.weather[0].description}</p>
            <p>${forecast.main.temp}&#176;C</p>
        `;

    forecastSection.appendChild(forecastElement);
  });
}

cityInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    const city = cityInput.value;
    fetchWeatherForecast(city);
  }
});

fetchWeatherForecast("London");

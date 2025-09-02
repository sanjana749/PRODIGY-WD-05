const apiKey = "4bf4d3385b057f435ed07c3eb6745454"; // 🔑 Replace with your OpenWeather API key
const weatherIcon = document.getElementById("weatherIcon");
const temperature = document.getElementById("temperature");
const cityName = document.getElementById("cityName");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (city === "") return;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.cod === "404") {
    cityName.innerHTML = "City not found";
    temperature.innerHTML = "--°C";
    humidity.innerHTML = "--%";
    wind.innerHTML = "-- km/h";
    weatherIcon.src = "";
    return;
  }

  cityName.innerHTML = data.name;
  temperature.innerHTML = Math.round(data.main.temp) + "°C";
  humidity.innerHTML = data.main.humidity + "%";
  wind.innerHTML = data.wind.speed + " km/h";

  const iconCode = data.weather[0].icon;
  weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

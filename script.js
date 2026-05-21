const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const form = document.getElementById("weather-form");
const apiKeyInput = document.getElementById("api-key-input");
const cityInput = document.getElementById("city-input");
const countryInput = document.getElementById("country-input");
const messageBox = document.getElementById("message");
const resultCard = document.getElementById("result-card");
const locationName = document.getElementById("location-name");
const weatherCondition = document.getElementById("weather-condition");
const weatherIcon = document.getElementById("weather-icon");
const temperatureValue = document.getElementById("temperature-value");
const humidityValue = document.getElementById("humidity-value");
const windValue = document.getElementById("wind-value");

function setMessage(text, type = "error") {
  messageBox.textContent = text;
  messageBox.style.color = type === "error" ? "#ef4444" : "#166534";
}

function clearMessage() {
  messageBox.textContent = "";
}

function showResult(data) {
  const location = `${data.name}, ${data.sys.country}`;
  const condition = data.weather[0]?.main || "Unknown";
  const description = data.weather[0]?.description || "";
  const iconCode = data.weather[0]?.icon || "01d";

  locationName.textContent = location;
  weatherCondition.textContent = `${condition} · ${description}`;
  weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  weatherIcon.alt = description ? `${condition} icon` : "Weather icon";
  temperatureValue.textContent = `${data.main.temp.toFixed(1)} °C`;
  humidityValue.textContent = `${data.main.humidity}%`;
  windValue.textContent = `${data.wind.speed.toFixed(1)} m/s`;

  resultCard.classList.remove("hidden");
}

async function fetchWeather(city, country, apiKey) {
  const query = `${encodeURIComponent(city)},${encodeURIComponent(country)}`;
  const url = `${BASE_URL}?q=${query}&units=metric&appid=${encodeURIComponent(apiKey)}`;

  const response = await fetch(url);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData.message || "Unable to retrieve weather data.";
    throw new Error(message);
  }

  return response.json();
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearMessage();
  resultCard.classList.add("hidden");

  const apiKey = apiKeyInput.value.trim();
  const city = cityInput.value.trim();
  const country = countryInput.value.trim();

  if (!apiKey || !city || !country) {
    setMessage("Please enter your API key, city, and country.");
    return;
  }

  setMessage("Looking up weather…", "success");

  try {
    const weatherData = await fetchWeather(city, country, apiKey);
    showResult(weatherData);
    clearMessage();
  } catch (error) {
    setMessage(error.message || "Could not load weather data.");
  }
});

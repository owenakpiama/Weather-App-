
const apiKey = '6c7caf5b4623733211d7422a58e9360e';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';


async function fetchWeatherData(city) {
  try {
    const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
}


function updateWeatherInformation(data) {
  const cityElement = document.getElementById('city');
  const temperatureElement = document.getElementById('temperature');
  const descriptionElement = document.getElementById('description');
  const weatherIconElement = document.getElementById('weatherIcon');
  
  cityElement.textContent = data.name;
  temperatureElement.textContent = `${data.main.temp}°C`;
  descriptionElement.textContent = data.weather[0].description;

  weatherIconElement.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
}


document.getElementById('weatherForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const city = document.getElementById('cityInput').value;
  if (city.trim() !== '') {
    const data = await fetchWeatherData(city);
    if (data) {
      updateWeatherInformation(data);
      document.getElementById('weatherInfo').style.display = 'block';
    } else {
      
      console.error('Failed to fetch weather data.');
    }
  }
});



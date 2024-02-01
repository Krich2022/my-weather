const apiKey = "0103eac9b2fdd2577b5958960a90a631"; // Replace with your actual API key
const baseUrl = "http://api.openweathermap.org/data/2.5/";
const searchHistory = [];

$("#search").on("click", function () {
  const city = $("#city").val().trim();
  if (!city) return;

  searchWeather(city);
});

function searchWeather(city) {
  const url = `${baseUrl}weather?q=${city}&units=metric&appid=${apiKey}`;

  $.getJSON(url, function (data) {
    displayCurrentWeather(data);
    addCityToSearchHistory(city);
    getForecast(city);
  });
}

function displayCurrentWeather(data) {
  const cityName = data.name;
  const temp = data.main.temp;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;
  const weatherIcon = data.weather[0].icon;
  const currentDate = new Date().toLocaleDateString();

  $("#cityName").text(cityName);
  $("#currentDate").text(currentDate);
  $("#weatherIcon").attr(
    "src",
    `http://openweathermap.org/img/w/${weatherIcon}.png`
  );
  $("#currentTemp").text(`Temperature: ${temp}°C`);
  $("#humidity").text(`Humidity: ${humidity}%`);
  $("#windSpeed").text(`Wind Speed: ${windSpeed} km/h`);
}

function addCityToSearchHistory(city) {
  if (!searchHistory.includes(city)) {
    searchHistory.push(city);
    renderSearchHistory();
  }
}

function renderSearchHistory() {
  $("#searchHistory").empty();
  searchHistory.forEach((city) => {
    const item = $("<li>")
      .addClass("search-history-item")
      .text(city)
      .on("click", function () {
        searchWeather($(this).text());
      });
    $("#searchHistory").append(item);
  });
}

function getForecast(city) {
  const url = `${baseUrl}forecast?q=${city}&units=metric&appid=${apiKey}`;

  $.getJSON(url, function (data) {
    displayForecast(data);
  });
}

function displayForecast(data) {
  $("#forecast").empty();
  data.list.slice(0, 5).forEach((day) => {
    const card = $("<div>").addClass("forecast-card");
    const date = new Date(day.dt * 1000).toLocaleDateString();
    const temp = day.main.temp;
    const humidity = day.main.humidity;
    const windSpeed = day.wind.speed;
    const weatherIcon = day.weather[0].icon;

    card.append($("<h2>").text(date));
    card.append(
      $("<img>").attr(
        "src",
        `http://openweathermap.org/img/w/${weatherIcon}.png`
      )
    );
    card.append($("<p>").text(`Temperature: ${temp}°C`));
    card.append($("<p>").text(`Humidity: ${humidity}%`));
    card.append($("<p>").text(`Wind Speed: ${windSpeed} km/h`));

    $("#forecast").append(card);
  });
}

$("#search").on("click", searchWeather);

function searchWeather() {
    let city = $("#city").val();
    let result = getLocation(city);
}

function getLocation(e) {
    return fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${e}&appid=0103eac9b2fdd2577b5958960a90a631`)
        .then((response) => response.json())
        .catch((error) => console.error("Error:", error));
}

const apiKey =
  "1b4207fb8225fe7368c7bc9c47baa7fd&fbclid=IwAR0kHN654hlhqzyiAo3tzsCSb8R2I3ZRgAmkQg_aYZ9Mydd84s6dVbmzpQU";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

var enterCity = document.querySelector(".enterCity");
var searchBtn = document.querySelector(".searchBtn");
var weatherIcon = document.querySelector(".weather-icon");
var card = document.querySelector(".card");
var rain = document.querySelector(".rain");
var thunder = document.querySelector(".thunder");
var mist = document.querySelector(".mist");
var snow = document.querySelector(".snow");
var clear = document.querySelector(".clear");

searchBtn.addEventListener("click", search);

// Fetch API
async function weather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}&units=metric`);
  var data = await response.json();
  console.log(data);

  if (response.status == 404) {
    alert("Please type valid city");
  } else {
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";
    document.querySelector(".wStatus").innerHTML = data.weather[0].main;

    // check weather img
    if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.gif";
      clear.play();
      thunder.pause();
      rain.pause();
      snow.pause();
      mist.pause();
      card.style.background = "linear-gradient(135deg,#00feba,#5b548a)";
    } else if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.gif";
      thunder.play();
      clear.pause();
      rain.pause();
      snow.pause();
      mist.pause();
      card.style.background = "linear-gradient(135deg,#aaaaaa,#cc9900)";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle.gif";
      rain.rain();
      thunder.pause();
      clear.pause();
      snow.pause();
      mist.pause();
      card.style.background = "linear-gradient(135deg,#0066cc,#66ccff)";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.gif";
      mist.play();
      rain.pause();
      thunder.pause();
      clear.pause();
      snow.pause();
      card.style.background = "linear-gradient(135deg,#aaaaaa,#cc9900)";
    } else if (data.weather[0].main == "Snow") {
      weatherIcon.src = "images/snow.gif";
      snow.play();
      rain.pause();
      thunder.pause();
      clear.pause();
      mist.pause();
      card.style.background = "linear-gradient(135deg,#0066cc,#66ccff)";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.gif";
      rain.play();
      thunder.pause();
      clear.pause();
      snow.pause();
      mist.pause();
      card.style.background = "linear-gradient(135deg,#003399,#00ccff)";
    }
  }
}

// Enter city
function search() {
  if (enterCity.value === "" || enterCity.value.match(/^\s*$/)) {
    alert("Please enter city name");
  } else {
    weather(enterCity.value);
  }
}

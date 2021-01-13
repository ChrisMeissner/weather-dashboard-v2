var myApi = "1ba7fe7548e5920eb3df1299e7ccc9f0";
var todayDate = moment().format("L");

var getSearch = function() {
  event.preventDefault();
  var searchVal = document.querySelector("#search").value;
  saveCity(searchVal);
  searchWeather(searchVal);
};

var saveCity = function(searchVal) {
  var li = document.createElement("li");
  li.classList.add("list-group-item");
  li.textContent = searchVal;
  li.onclick = function() {
      saveCity(searchVal);
  };
  var history = document.querySelector("#city-history");
  history.appendChild(li);
};

var searchWeather = function(searchVal) {
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${searchVal}&appid=${myApi}&units=imperial`)
    .then((response) => {
      return response.json();
    }).then((cityData) => {
      console.log('City Data:', cityData);

      var today = document.querySelector("#today-weather");

      if (today) {
        today.innerHTML = "";
      };

      var card = document.createElement("div");
      card.classList.add("card");

      var cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      today.append(card);
      card.appendChild(cardBody);

      var weatherIcon = cityData.weather[0].icon;
      console.log("weather icon:", weatherIcon);
      var iconurl = "https://openweathermap.org/img/wn/"+ weatherIcon +"@2x.png";

      var title = document.createElement("h3");
      title.classList.add("card-title");
      title.innerHTML = searchVal + " " + "(" + todayDate + ")" + "<img src=" + iconurl + ">";

      var temp = document.createElement("p");
      temp.classList.add("card-text");
      temp.textContent = "Temperature: " + cityData.main.temp + "°F";

      var humidity = document.createElement("p");
      humidity.classList.add("card-text");
      humidity.textContent = "Humidity: " + cityData.main.humidity + "%";

      var windSpeed = document.createElement("p");
      windSpeed.classList.add("card-text");
      windSpeed.textContent = "Wind Speed: " + cityData.wind.speed + " mph";

      cardBody.appendChild(title);
      cardBody.appendChild(temp);
      cardBody.appendChild(humidity);
      cardBody.appendChild(windSpeed);

      var lat = cityData.coord.lat;
      console.log('lat: ', lat);
      var lon = cityData.coord.lon;
      console.log('lon: ', lon);
      

      getUV(lat, lon);

      fiveDayForecast(searchVal);
    });
}

var getUV = function(lat, lon) {
  fetch(`http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${myApi}`)
    .then((response) => {
        return response.json();
    }).then((uvData) => {
      console.log("UV Data:", uvData);
      
    });
};

var fiveDayForecast = function(searchVal){
  fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${searchVal}&appid=${myApi}`)
    .then((response) => {
        console.log(response);
        return response.json();
    }).then((fiveDayData) => {
        console.log("Five-Day:", fiveDayData);
    });
};

document.querySelector("#searchBtn").addEventListener("click", getSearch);
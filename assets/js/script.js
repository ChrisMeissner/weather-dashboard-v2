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
      searchWeather(searchVal);
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

      var today = document.querySelector("#today-weather");
      var uvCard = document.createElement("uvCard");
      uvCard.classList.add("card");

      today.append(uvCard);

      var uvCardBody = document.createElement("uvCardBody");
      uvCardBody.classList.add("card-body");
      uvCard.appendChild(uvCardBody);

      var uvIndex = uvData.value;

      if (uvIndex <= 2) {
        uvCard.classList.add("bg-success");
      } else if (uvIndex <= 5) {
        uvCard.classList.add("bg-warning");
      } else {
        uvCard.classList.add("bg-danger");
      };

      var uvValue = document.createElement("p");
      uvValue.classList.add("card-text");
      uvValue.classList.add("text-light");
      uvValue.innerHTML = "UV Index: " + uvIndex;
      uvCardBody.appendChild(uvValue);

    });
};

var fiveDayForecast = function(searchVal){
  fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${searchVal}&appid=${myApi}`)
    .then((response) => {
        console.log(response);
        return response.json();
    }).then((fiveDayData) => {
      console.log("Five-Day:", fiveDayData);

      var fiveDay = document.querySelector("#five-day");

        if(fiveDay) {
          fiveDay.innerHTML = "";
        };

      for (var i = 0; i < 40; i = i + 8) {
        var fiveDate = fiveDayData.list[i].dt_txt;
        var futureDate = moment(fiveDate).format("L");
        var fiveIconCode = fiveDayData.list[i].weather[0].icon;
        var fiveIconUrl = "https://openweathermap.org/img/wn/" + fiveIconCode + ".png";
        var fiveTemp =  fiveDayData.list[i].main.temp
        var fiveHumidity = fiveDayData.list[i].main.humidity;

        var card = document.createElement("fiveCard");
        card.classList.add("card");
        card.classList.add("bg-primary");
        card.classList.add("col-md-2");
        card.classList.add("text-light");
        card.setAttribute("style", "margin: 5px");

        fiveDay.append(card);
  
        var cardBody = document.createElement("fiveCardBody");
  
        card.appendChild(cardBody);

        var date = document.createElement("p");
        date.classList.add("card-text");
        date.textContent = futureDate; 
        cardBody.appendChild(date);

        var fiveIcon = document.createElement("p");
        fiveIcon.innerHTML = "<img src=" + fiveIconUrl + ">";
        cardBody.appendChild(fiveIcon);
        
        var temp = document.createElement("p");
        temp.classList.add("card-text");
        temp.textContent = "Temp: " + fiveTemp + "°F";
        cardBody.appendChild(temp);

        var humidity = document.createElement("p");
        humidity.classList.add("card-text");
        humidity.textContent = "Humidity: " + fiveHumidity + "%";
        cardBody.appendChild(humidity);
      }
    });
};

document.querySelector("#searchBtn").addEventListener("click", getSearch);
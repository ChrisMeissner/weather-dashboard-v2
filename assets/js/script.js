var myApi = "1ba7fe7548e5920eb3df1299e7ccc9f0";
var todayDate = moment().format("L");

function getSearch() {
  event.preventDefault();
  var searchVal = document.querySelector("#search").value;
  saveCity(searchVal);
  searchWeather(searchVal);
};

function saveCity(searchVal) {
  var li = document.createElement("li");
  li.classList.add("list-group-item");
  li.textContent = searchVal;
  li.onclick = function() {
      saveCity(searchVal);
  };
  var history = document.querySelector("#city-history");
  history.appendChild(li);
};

function searchWeather(searchVal) {
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${searchVal}&appid=${myApi}&units=imperial`)
    .then((response) => {
      return response.json();
    }).then((cityData) => {
      console.log('City Data', cityData);

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

      var title = document.createElement("h3");
      title.classList.add("card-title");
      title.textContent = searchVal + " " + "(" + todayDate + ")";

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



    })
}

document.querySelector("#searchBtn").addEventListener("click", getSearch);
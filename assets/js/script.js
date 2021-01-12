var myApi = "1ba7fe7548e5920eb3df1299e7ccc9f0";

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
    })
}

document.querySelector("#searchBtn").addEventListener("click", getSearch);
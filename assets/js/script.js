function getSearch() {
  event.preventDefault();
  var searchVal = document.querySelector("#search").value;
  saveCity(searchVal);
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

document.querySelector("#searchBtn").addEventListener("click", getSearch);
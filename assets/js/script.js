function getSearch() {
  event.preventDefault();
  var searchVal = document.querySelector("#search").value;
  console.log(searchVal);
} ;

document.querySelector("#searchBtn").addEventListener("click", getSearch);
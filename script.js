//!!NEXT STEPS!! 
//Create function for 5-day forecast
//5-Day Forecast (create separate function *Call geocode API to find lat&lon)
//Make local storage data persist display 



//Global Variables
var searchedCities = [];
var currentWeatherContainerEl=document.querySelector("#current-weather-container");
var citySearchedInputEl = document.querySelector("#searched-city");

//Variable to store API key
var APIKey = "61575cadc8adff6b8ca0fdec73b15a2d";

//Search bar click action function - reads user input from search bar, calls currentCityWeatherFunction and saveSearch function
$("#submit").click(function(event){
    event.preventDefault();

var city = $("#searchBar").val();
if(city){
    currentCityWeather(city);
    searchedCities.unshift({city});
    
}else{
    alert("Please Enter City Name");
}
saveSearch();
});

//Function to save user input to local storage
var saveSearch = function(){
    localStorage.setItem("searchedCities",JSON.stringify(searchedCities));
};

//Function for Current Weather API Call
var currentCityWeather = function(city){
var queryCurrentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`;
fetch(queryCurrentWeatherURL)
.then(function(response){
    response.json().then(function(data){
        displayCurrentWeather(data,city);
        });
    });
};

//Function for displaying current weather data for searched city inline at top of Weather Dashboard
var displayCurrentWeather =function(weather,searchedCity){
    currentWeatherContainerEl.textContent="";
    citySearchedInputEl.textContent=searchedCity;

//Format date element and append to searched city
var currentDate = document.createElement("SPAN");
currentDate.textContent=" (" + moment(weather.dt.value).subtract(10,'days').calendar() + ") ";
citySearchedInputEl.appendChild(currentDate);

//Create image element and append to searched city
var weatherIcon = document.createElement("img");
weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`);
citySearchedInputEl.appendChild(weatherIcon);

//Create span element to hold Temperature data
var temperatureEl = document.createElement("SPAN");
temperatureEl.textContent = "Temperature: " + weather.main.temp + " °F";

//Create a span element to hold Humidity data
var humidityEl = document.createElement("SPAN");
humidityEl.textContent = "Humidity: " + weather.main.humidity + " %";

//Create a span element to hold Windspeed data
var windSpeedEl = document.createElement("SPAN");
windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed + " MPH";

//Append span elements holding data to container for searched city's current weather
currentWeatherContainerEl.appendChild(temperatureEl);
currentWeatherContainerEl.appendChild(windSpeedEl);
currentWeatherContainerEl.appendChild(humidityEl);

};

//API Call - Geocoder

//API Call - 5-Day Forecast








// ================================
// Weather Code Translator
// ================================

function getWeatherText(code){

const weatherCodes={

0:"Clear Sky",
1:"Mainly Clear",
2:"Partly Cloudy",
3:"Cloudy",
45:"Fog",
48:"Fog",
51:"Light Drizzle",
53:"Drizzle",
55:"Heavy Drizzle",
61:"Light Rain",
63:"Rain",
65:"Heavy Rain",
71:"Snow",
80:"Rain Showers",
95:"Thunderstorm"

};

return weatherCodes[code]||"Unknown";

}

// ================================
// Loading
// ================================

export function showLoading(){

document.getElementById("loading").classList.remove("hidden");

document.getElementById("error").classList.add("hidden");

}

export function hideLoading(){

document.getElementById("loading").classList.add("hidden");

}

// ================================
// Error
// ================================

export function showError(message){

const error=document.getElementById("error");

error.textContent=message;

error.classList.remove("hidden");

}

// ================================
// Weather
// ================================

export function displayWeather(location,weather){

document.getElementById("weatherCard").classList.remove("hidden");

document.getElementById("cityName").textContent=

`${location.name}, ${location.country}`;

document.getElementById("temperature").textContent=

`${weather.current.temperature_2m} °C`;

document.getElementById("condition").textContent=

getWeatherText(weather.current.weather_code);

document.getElementById("wind").textContent=

`${weather.current.wind_speed_10m} km/h`;

}

// ================================
// Forecast
// ================================

export function displayForecast(weather){

const forecast=document.getElementById("forecast");

const cards=document.getElementById("forecastCards");

cards.innerHTML="";

forecast.classList.remove("hidden");

weather.daily.time.forEach((day,index)=>{

const card=document.createElement("div");

card.className="forecast-item";

card.innerHTML=`

<h4>Day ${index+1}</h4>

<p>${weather.daily.temperature_2m_max[index]}° /
${weather.daily.temperature_2m_min[index]}°</p>

`;

cards.appendChild(card);

});

}

// ================================
// Recent Searches
// ================================

export function displayRecentSearches(recent,callback){

const list=document.getElementById("recentList");

list.innerHTML="";

recent.forEach(city=>{

const li=document.createElement("li");

li.textContent=city;

li.addEventListener("click",()=>{

callback(city);

});

list.appendChild(li);

});

}
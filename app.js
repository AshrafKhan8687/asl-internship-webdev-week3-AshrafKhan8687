import {getCoordinates,getWeather} from "./api.js";

import{

displayWeather,
displayForecast,
showLoading,
hideLoading,
showError,
displayRecentSearches

} from "./ui.js";

const cityInput=document.getElementById("cityInput");

const locationBtn=document.getElementById("locationBtn");

const unitToggle=document.getElementById("unitToggle");

let recent=JSON.parse(localStorage.getItem("recentCities"))||[];

displayRecentSearches(recent,searchCity);

searchBtn.addEventListener("click",()=>{

searchCity(cityInput.value.trim());

});

async function searchCity(city){

if(city===""){

showError("Please enter a city.");

return;

}

showLoading();

try{

const location=await getCoordinates(city);

const weather=await getWeather(

location.latitude,

location.longitude

);

displayWeather(location,weather);

displayForecast(weather);

hideLoading();

saveRecent(city);

}

catch(error){

hideLoading();

showError(error.message);

}

}

function saveRecent(city){

recent=recent.filter(item=>item!==city);

recent.unshift(city);

recent=recent.slice(0,5);

localStorage.setItem(

"recentCities",

JSON.stringify(recent)

);

displayRecentSearches(recent,searchCity);

}

// ==========================
// Current Location
// ==========================

locationBtn.addEventListener("click",()=>{

if(!navigator.geolocation){

showError("Geolocation is not supported.");

return;

}

navigator.geolocation.getCurrentPosition(

async(position)=>{

showLoading();

try{

const weather=await getWeather(

position.coords.latitude,

position.coords.longitude

);

const location={

name:"Current Location",

country:""

};

displayWeather(location,weather);

displayForecast(weather);

hideLoading();

}

catch(error){

hideLoading();

showError(error.message);

}

},

()=>{

showError("Unable to get your location.");

}

);

});

// ==========================
// Temperature Toggle
// ==========================

unitToggle.addEventListener("change",()=>{

const temp=document.getElementById("temperature");

let value=parseFloat(temp.textContent);

if(isNaN(value)) return;

if(unitToggle.checked){

temp.textContent=((value*9/5)+32).toFixed(1)+" °F";

}

else{

temp.textContent=((value-32)*5/9).toFixed(1)+" °C";

}

});
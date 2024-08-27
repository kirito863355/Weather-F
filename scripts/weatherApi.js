// api key '2d770a25df6c440f859180447242708'

let search = document.getElementById('search');
let btn = document.getElementById('btn');

let city;

let apiForecast = `https://api.weatherapi.com/v1/forecast.json?key=2d770a25df6c440f859180447242708&q=${city}&days=1&aqi=no&alerts=no`; // forecast

async function getInfo(api){
    let response = await fetch(api);
    let result = await response.json();
    
    console.log(result);
    
}

btn.onclick = () => {
    city = search.value;
    let api = `https://api.weatherapi.com/v1/current.json?key=2d770a25df6c440f859180447242708&q=${city}&aqi=no`; // current
    getInfo(api);
}
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

/ Приклад відповіді API для перевірки (відповідь буде відрізнятись при реальних запитах)
const exampleApiResponse = {
    forecast: {
        forecastday: [
            {
                hour: [
                    { time_epoch: 1693686000, time: "2024-09-01 00:00", temp_c: 18.0 },
                    { time_epoch: 1693689600, time: "2024-09-01 01:00", temp_c: 17.5 },
                    // ...
                    { time_epoch: 1693732800, time: "2024-09-01 23:00", temp_c: 14.5 },
                ]
            },
            {
                hour: [
                    { time_epoch: 1693736400, time: "2024-09-02 00:00", temp_c: 15.0 },
                    // ...
                ]
            }
            // ...
        ]
    }
};

// Функція для отримання погодинного прогнозу
function getNextHourForecast(apiResponse) {
    const now = new Date(); // поточний час
    let currentHour = now.getHours(); // поточна година
    let currentDayIndex = 0;

    // Отримуємо прогноз на наступну годину
    let nextHour = currentHour + 1;

    // Якщо наступна година більше 23, то переходимо на наступний день
    if (nextHour > 23) {
        nextHour = 0; // скидаємо до 0-ї години
        currentDayIndex = 1; // переходимо на наступний день
    }

    // Отримуємо прогноз на обраний день та годину
    const forecastDay = apiResponse.forecast.forecastday[currentDayIndex];
    const nextHourForecast = forecastDay.hour.find(hourData => {
        const hourDate = new Date(hourData.time);
        return hourDate.getHours() === nextHour;
    });

    return nextHourForecast;
}

// Використання функції для отримання прогнозу на наступну годину
const nextHourWeather = getNextHourForecast(exampleApiResponse);
console.log(nextHourWeather);

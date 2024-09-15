// api key '2d770a25df6c440f859180447242708'

let search = document.getElementById('search');
let btn = document.getElementById('btn');

const item_1 = document.querySelector('.item-1');
const item_2 = document.querySelector('.item-2');
const item_5 = document.querySelector('.item-5');

const weatherIcons = {
    "Sunny": "./icons/sunny.svg",
    "Cloudy": "./icons/cloud.svg",
    "Partly cloudy": "./icons/cloudy_part.svg",
    "Rain": "./icons/rain.svg",
    "Thunderstorm": "./icons/thunderstorm.svg",
    // "Snow": "icons/snow.png",
    // "Mist": "icons/mist.png",
};

// Функція для отримання шляху до іконки на основі умов погоди
function getWeatherIcon(conditionText) {
    if (weatherIcons[conditionText]) {
        return weatherIcons[conditionText];
    } else {
        return "icons/sunny.svg"; // Іконка за замовчуванням
    }
}

// Функція для отримання прогнозу з API
async function getWeatherData(city) {
    const apiKey = '2d770a25df6c440f859180447242708';
    // const city = search.value;
    // const city = 'Lviv';
    const days = 6;
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=${days}&aqi=no&alerts=no`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Помилка завантаження даних з API');
        }
        const weatherData = await response.json();
        return weatherData;
    } catch (error) {
        console.error('Помилка:', error);
    }
}

// Функція для отримання прогнозу на наступні години
function getNextHoursForecast(apiResponse, hoursAhead = 6) {
    if (!apiResponse || !apiResponse.forecast || !apiResponse.forecast.forecastday) {
        console.error('Невірна відповідь або відсутні дані про прогноз.');
        return null;
    }

    const now = new Date();
    let currentHour = now.getHours();
    const currentDayIndex = 0; // Починаємо з поточного дня

    let forecasts = [];
    let forecastDay = apiResponse.forecast.forecastday[currentDayIndex].hour;

    // Переглядаємо наступні години
    for (let i = 1; i <= hoursAhead; i++) {
        let nextHour = currentHour + i;

        // Якщо годину більше 23, беремо дані з наступного дня
        if (nextHour > 23) {
            nextHour -= 24;
            forecastDay = apiResponse.forecast.forecastday[1].hour; // Переходимо до наступного дня
        }

        // Шукаємо прогноз для потрібної години
        const nextHourForecast = forecastDay.find(hourData => {
            const hourDate = new Date(hourData.time);
            return hourDate.getHours() === nextHour;
        });

        // Якщо прогноз знайдено, додаємо його до списку
        if (nextHourForecast) {
            forecasts.push(nextHourForecast);
        }
    }

    return forecasts;
}

// Функція для отримання прогнозу на декілька днів вперед
function getForecastForNextDays(apiResponse) {
    if (!apiResponse || !apiResponse.forecast || !apiResponse.forecast.forecastday) {
        console.error('Невірна відповідь або відсутні дані про прогноз.');
        return null;
    }

    // Отримуємо дані на декілька днів
    const forecastDays = apiResponse.forecast.forecastday; 
    return forecastDays;
}

// Використання асинхронної функції
async function test(city) {
    const weatherData = await getWeatherData(city);
    console.log(weatherData);    
    if (weatherData) {

        // weather

        const conditionText = weatherData.current.condition.text; // Отримуємо погодні умови з API
        const iconSrc = getWeatherIcon(conditionText); // Отримуємо відповідну іконку
        console.log(iconSrc);
        

        // Змінюємо зображення іконки
        // const weatherIconElement = document.getElementById('src1');
        // weatherIconElement.src = iconSrc;

        const nextHoursWeather = getNextHoursForecast(weatherData, 6); // Отримуємо прогноз на наступні 6 годин
        console.log('Прогноз на наступні години:', nextHoursWeather);
        console.log(nextHoursWeather[0].time);
        

        // hours
        item_1.innerHTML = `
        <div>
            <span>Now</span>
            <img src="./${iconSrc}" alt="">
            <span style="font-weight: bold;">${Math.round(weatherData.current.temp_c)}°</span>
        </div>   
        <div>
            <span>${nextHoursWeather[0].time.split(" ")[1]}</span>
            <img src="./icons/rain.svg" alt="">
            <span>${Math.round(nextHoursWeather[0].temp_c)}°</span>
        </div>
        <div>
            <span>${nextHoursWeather[1].time.split(" ")[1]}°</span>
            <img src="./icons/rain.svg" alt="">
            <span>${Math.round(nextHoursWeather[1].temp_c)}°</span>
        </div>
        <div>
            <span>${nextHoursWeather[2].time.split(" ")[1]}</span>
            <img src="./icons/rain.svg" alt="">
            <span>${Math.round(nextHoursWeather[2].temp_c)}°</span>
        </div>
        <div>
            <span>${nextHoursWeather[3].time.split(" ")[1]}</span>
            <img src="./icons/rain.svg" alt="">
            <span>${Math.round(nextHoursWeather[3].temp_c)}°</span>
        </div>
        <div>
            <span>${nextHoursWeather[4].time.split(" ")[1]}</span>
            <img src="./icons/rain.svg" alt="">
            <span>${Math.round(nextHoursWeather[4].temp_c)}°</span>
        </div>        
        `;

        const forecastDays = getForecastForNextDays(weatherData); // Отримуємо прогноз на наступні дні   
        console.log(forecastDays);
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var dayOfWeek1 = [];
        forecastDays.forEach(forecastDays => {
            const dateStr = forecastDays.date; // Дата прогнозу у форматі YYYY-MM-DD
            const date = new Date(dateStr); // Конвертуємо рядок дати у об'єкт Date
            dayOfWeek1.push(daysOfWeek[date.getDay()]);// Отримуємо назву дня тижня
        });
        console.log(dayOfWeek1);
        
        // days
        item_2.innerHTML = `
            <div>
                <span>Today</span>
                <img src="./icons/rain.svg" alt="">
                <span>${Math.round(forecastDays[0].day.maxtemp_c)}°  ${Math.round(forecastDays[0].day.mintemp_c)}°</span>
            </div>
            <div>
                <span>${dayOfWeek1[1]}</span>
                <img src="./icons/rain.svg" alt="">
                <span>${Math.round(forecastDays[1].day.maxtemp_c)}°  ${Math.round(forecastDays[1].day.mintemp_c)}°</span>
            </div>
            <div>
                <span>${dayOfWeek1[2]}</span>
                <img src="./icons/rain.svg" alt="">
                <span>${Math.round(forecastDays[2].day.maxtemp_c)}°   ${Math.round(forecastDays[2].day.mintemp_c)}°</span>
            </div>
            <div>
                <span></span>
                <img src="./icons/rain.svg" alt="">
                <span></span>
            </div>
            <div>
                <span></span>
                <img src="./icons/rain.svg" alt="">
                <span></span>
            </div>
            <div>
                <span></span>
                <img src="./icons/rain.svg" alt="">
                <span></span>
            </div>
            <div>
                <span></span>
                <img src="./icons/rain.svg" alt="">
                <span></span>
            </div>
        `;

        // present

        const localtime1 = weatherData.location.localtime; // Отримуємо localtime з відповіді API

        // Розділяємо рядок на дату і час
        const [date, time] = localtime1.split(" ");

        // Розділяємо рядок на частини за допомогою "-"
        const [year, month, day] = date.split("-");

        item_5.innerHTML = `
            <div>
                <span>${weatherData.location.name}</span>
                <span>${time} · ${day}/${month}</span>
                <span>${Math.round(weatherData.current.temp_c)}°</span>
            </div>
            <div>
                <img src="./icons/big_size_rain.svg" alt="">
            </div>
        `;

        // <div>
        //             <span></span>
        //             <img src="" alt="">
        //             <span></span>
        //         </div>
        //         <div>
        //             <span></span>
        //             <img src="" alt="">
        //             <span></span>
        //         </div>
        //         <div>
        //             <span></span>
        //             <img src="" alt="">
        //             <span></span>
        //         </div>
        //         <div>
        //             <span></span>
        //             <img src="" alt="">
        //             <span></span>
        //         </div>
    }
    


}

// test();


btn.onclick = () => {
    let city = search.value;

    test(city);

}
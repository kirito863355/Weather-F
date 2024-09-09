// api key '2d770a25df6c440f859180447242708'

let search = document.getElementById('search');
let btn = document.getElementById('btn');

const item_1 = document.querySelector('.item-1');

async function getInfo(api) {
    let response = await fetch(api);
    let result = await response.json();

    console.log(result);

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

    if (!result.forecast.forecastday[currentDayIndex]) {
        currentDayIndex = 0; // Якщо немає даних про наступний день, залишаємо поточний
    }

    // Отримуємо прогноз на обраний день та годину
    const forecastDay = result.forecast.forecastday[currentDayIndex];
    const nextHourForecast = forecastDay.hour.find(hourData => {
        const hourDate = new Date(hourData.time);
        return hourDate.getHours() === nextHour;
    });

    console.log(nextHourForecast);


    item_1.innerHTML = `
        <div>
            <span>Now</span>
            <img src="./icons/Image.svg" alt="">
            <span style="font-weight: bold;">${result.current.temp_c}</span>
        </div>   
        <div>
        <span>${nextHourForecast.time}</span>
        <img src="./icons/Image.svg" alt="">
        <span>${nextHourForecast.temp_c}</span>
        </div>

        
        `;


}

btn.onclick = () => {
    let city = search.value;
    let api = `https://api.weatherapi.com/v1/forecast.json?key=2d770a25df6c440f859180447242708&q=${city}&days=6&aqi=no&alerts=no`; // forecast

    getInfo(api);

}
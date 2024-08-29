// api key '2d770a25df6c440f859180447242708'

let search = document.getElementById('search');
let btn = document.getElementById('btn');

let city;

const item_1 = document.querySelector('.item-1');

async function getInfo(api){
    let response = await fetch(api);
    let result = await response.json();

    console.log(result);    

    item_1.innerHTML = `
        <div>
            <span>Now</span>
            <img src="./icons/Image.svg" alt="">
            <span style="font-weight: bold;">${result.current.temp_c}</span>
        </div>
        div>
            <span>${}</span>
            <img src="" alt="">
            <span>${}</span>
        </div>
        <div>
            <span>${}</span>
            <img src="" alt="">
            <span>${}</span>
        </div>
        <div>
            <span>${}</span>
            <img src="" alt="">
            <span>${}</span>
        </div>
        <div>
            <span>${}</span>
            <img src="" alt="">
            <span>${}</span>
        </div>
        <div>
            <span>${}</span>
            <img src="" alt="">
            <span>${}</span>
        </div>        
        
    `;
    
}


btn.onclick = () => {
    city = search.value;
    let api = `https://api.weatherapi.com/v1/forecast.json?key=2d770a25df6c440f859180447242708&q=${city}&days=6&aqi=no&alerts=no`; // forecast

    getInfo(api);
}
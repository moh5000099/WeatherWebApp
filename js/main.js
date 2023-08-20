let card0 = document.getElementById("card0");
let otherCards=[];
let otherCardsNo=2;
for(let i=1;i<=otherCardsNo;i++){
    otherCards.push(document.getElementById(`card${i}`));
}
let myInput = document.getElementById("myInput");
let myButton = document.getElementById("myButton");




async function getApi(myLocation) {
    let myApi = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=bc01e292a35040609aa174910232008&q=${myLocation}&days=3&aqi=no&alerts=no`);
    let myApiArr = await myApi.json();
    display(myApiArr);
}

function display(myWeather) {
    let days=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months =["January","February","March","April","May","June","July","August","September","October","November","December"];
    let myDate= new Date(myWeather.location.localtime);
    let myDayIndex = myDate.getDay();
    let myMonthIndex= myDate.getMonth();
    let myDayOfMonth=myDate.getDate();
    card0.innerHTML = `
    <div class="card-header border-0 d-flex justify-content-between align-items-center">
        <span class="main-color-gray" >${days[myDayIndex]}</span>
        <span class="main-color-gray">${myDayOfMonth}${months[myMonthIndex]}</span>
    </div>
    <div class="card-body">
        <p class="main-color-gray fs-4">${myWeather.location.name}</p>
        <h5 class="card-title fs-big"><span> ${myWeather.current.temp_c}°C</span><img src="https:${myWeather.current.condition.icon}" alt="." class="img-fluid ms-5"></h5>
        </div>
    <div class="card-body py-2">
        <p class="card-text main-color">${myWeather.current.condition.text}</p>
        <span class="main-color-gray"><i class="fa-solid fa-umbrella"></i> ${myWeather.current.humidity}%</span>
        <span class="main-color-gray mx-2"><i class="fa-solid fa-wind"></i> ${myWeather.current.wind_kph}km/h</span>
        <span class="main-color-gray"><i class="fa-regular fa-compass"></i> ${myWeather.current.wind_dir}</span>
    </div>
    `;

    let myOtherDayIndex;
    for(let i=1; i<=otherCardsNo; i++)
    {
        myOtherDayIndex=myDayIndex+i;
        while(myOtherDayIndex >6){
            myOtherDayIndex -=7;
        }
        otherCards[i-1].innerHTML = `
        <div class="card-header border-0 d-flex justify-content-center align-items-center">
            <span class="main-color-gray">${days[myOtherDayIndex]}</span>
        </div>
        <div class="card-body text-center d-flex justify-content-center align-items-center">
            <div class="container">
            <img src="http:${myWeather.forecast.forecastday[i].day.condition.icon}" alt=".">
            <h5 class="card-title mt-3 fs-2">${myWeather.forecast.forecastday[i].day.maxtemp_c}°C</h5>
            <h5 class="mb-3 fs-5 main-color-gray">${myWeather.forecast.forecastday[i].day.mintemp_c}°C</h5>
            <p class="card-text main-color">${myWeather.forecast.forecastday[i].day.condition.text}</p>
            </div>
        </div>
        `; 
    }
}


getApi("cairo");

myInput.addEventListener("keyup",function(){
    if(this.value == ""){
        myButton.style.cssText="transform: translateY(-50%)  scale(0)  !important;"
    }else{
        myButton.style.cssText="transform: translateY(-50%)  scale(1)  !important;"
        getApi(this.value);
    }
});
myButton.addEventListener("click",function(){
    myInput.value=""
    myButton.style.cssText="transform: translateY(-50%)  scale(0)  !important; cursor: text;"
});
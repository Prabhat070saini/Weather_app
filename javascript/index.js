
// async function showWeather() {
//     let lat = 28.667856;
//     let lon = 77.449791;
//     let city = "Ghaziabad";
//     const resopnce = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`);
//     let data = await resopnce.json();
//     //     let tempp = document.createElement('p');
//     //     tempp.textContent = `${data?.main?.temp.toFixed(2)}`;
//     //     document.body.appendChild(tempp);
//     //     console.log(data);
//     // 
// }



const user_tab = document.querySelector("[data-userweather]");
const search_tab = document.querySelector("[data-searcheweather]");
const user_container = document.querySelector(".weather-container");

const grantaccess_container = document.querySelector(".grant-location-dontainer");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const user_info_container = document.querySelector(".user-info-container");
let API_key = "6bf663cc4e7bcd5b483a7c3e507556ed";
let old_tab = user_tab;
old_tab.classList.add("current-tab");
// something pending else

let switchTab = (new_tab) => {
    if (new_tab != old_tab) {
        old_tab.classList.remove("current-tab");
        old_tab = new_tab;
        old_tab.classList.add("current-tab");

        if (!searchForm.classList.contains("active")) {
            user_info_container.classList.remove("active");
            grantaccess_container.classList.remove("active");
            searchForm.classList.add("active");
        }
        else {
            searchForm.classList.remove("active");
            user_info_container.classList.remove("active");
            getFromSessionStorage();
        }
    }
}
user_tab.addEventListener("click", () => {
    switchTab(user_tab);
});
search_tab.addEventListener("click", () => {
    switchTab(search_tab);
});


// funtnion to find current location
let getFromSessionStorage = () => {
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if (!localCoordinates) {
        grantaccess_container.classList.add("active");
    }
    else {
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}
getFromSessionStorage();
async function fetchUserWeatherInfo(coordinates) {
    const { lat, lon } = coordinates;


    //  make grant container invisiable
    grantaccess_container.classList.remove("active");

    // make loading screen visible

    loadingScreen.classList.add("active");
    try {
        let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`);
        let data = await res.json();
        loadingScreen.classList.remove("active");
        user_info_container.classList.add("active");
        // grantaccess_container.classList.remove("active");
        renderWeatherInfo(data);
    }
    catch (err) {
        console.log("nadnasnjkdfklj");
    }

}
let renderWeatherInfo = (data) => {
    // first fetch element from html
    const cityName = document.querySelector("[data-city-name]");
    const currentIcon = document.querySelector("[data-contury-icon]");
    const desc = document.querySelector("[data-weatherdec]");
    const weatherIcon = document.querySelector("[data-weather-icon]");
    const temp = document.querySelector("[data-temprature]");
    const cloud = document.querySelector("[data-cloudsF]");
    const windSpeed = document.querySelector("[data-wind-speed]");
    const humidity = document.querySelector("[data-humidity");


    // fetch value and set ui element
    cityName.innerText = data?.name;
    currentIcon.src = `https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`;
    desc.innerText = data?.weather?.[0]?.description;
    weatherIcon.src = `https://openweathermap.org/img/w/${data?.weather?.[0]?.icon}.png`;
    temp.innerText = data?.main?.temp + " \u00B0C";
    windSpeed.innerText = data?.wind?.speed + " m/s";
    humidity.innerText = data?.main?.humidity + "%";
    cloud.innerText = data?.clouds?.all + "%";
}
function getLocation() {
    if (navigator.geolocation) {
        // console.log("MILGYA");
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {

    }
}
function showPosition(position) {
    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }
    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}
const grandAccessButton = document.querySelector("[data-grantAccess]");
grandAccessButton.addEventListener("click", getLocation);
const searchInput = document.querySelector("[data-dearchinput]");
searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let cityName = searchInput.value;
    // cityName = "lucknow";
    // console.log(cityName);
    if (cityName === "") return;
    else
        fetchSearchweatherInfo(cityName);


});
async function fetchSearchweatherInfo(cityName) {
    // loadingScreen.classList.add("active");
    // user_info_container.classList.remove("active");
    // grantaccess_container.classList.remove("active");
    try {

        const resopnce = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_key}`);
        let data = await resopnce.json();
        loadingScreen.classList.remove("active");
        user_info_container.classList.add("active");
        // console.log(data);

        renderWeatherInfo(data);
    }
    catch {
        console.log("nadnasnjkdfklj");
    }
}

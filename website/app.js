/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
// Personal API Key for OpenWeatherMap API
const apiKey = "&appid=b2dda5f9a287cc41311fbe1e99adf441&units=imperial"

const entryHolder = document.getElementById("entryHolder");
// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", performAction);

// AddEventListener callback function
function performAction() {
    let zipCode = document.getElementById("zip").value.trim();
    getData(baseURL+zipCode+apiKey).then((data) => {
        if (data.cod !== 200) {
            alert("Invalid zipcode");
            return false;
        } else {
            let fellings = document.getElementById("feelings").value.trim();
            // Create a new date instance dynamically with JS
            let d = new Date();
            let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();
            postData("/data", {temp: data, weath: data, date: newDate, fell: fellings});
        }
    }).then((returnVal) => {
        if (returnVal !== false) {
            updateUi();
        }
    });
}

// Get request to the weather info API
const getData = async (url = "") => {
    const requset = await fetch(url);
    try{
        const data = await requset.json();
        return data;
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

// Post request from client side to server side 
const postData = async (url = "", data = {}) => {
    const response = await fetch (url, {
        method: "POST",
        credentials: "same-origin",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
    });
    try{
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

// UpdateUi asunchrounous function that get all data from server side endpoint and update the DOM elements
const updateUi = async () => {
    const retrieveData = await fetch ("/all");
    try{
        const allData = await retrieveData.json();
        document.getElementById("temp").innerHTML = `${Math.round(allData.temperature)} °F<p>${allData.weather}</p>`;
        document.getElementById("date").innerHTML = allData.date;
        document.getElementById("content").innerHTML = allData.fellings;
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}




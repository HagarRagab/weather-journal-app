<h1>Weather-Journal App Project</h1>

<h2>Table of Contents</h2>

* [Overview](#Instructions)
* [Description](#Description)

<h3>Overview</h3>
<p>This asynchronous web app uses Web API and user data to dynamically update the UI.</p>

<h3>Description</h3>
<ul>
    In this project I use addEvenListener to add function to button element this function: 
    <li>Stores zip code from user input in a variable.</li>
    <li>Uses getData function that need one argument "URL" that consists of (baseURL + user zip code + Personal API Key). this function
    send a get request to the weather info API.</li>
    <li>By promises chaning I use then function that stores user fellings input value in a variable then get the date finally send a post request to server side to store the data into end point object.</li>
    <li>The postData function needs two arguments the route and object includes this data (temperature, date and fellings).</li>
    <li>By another chain I add the updateUi function that get all data from server side endpoint and update the DOM elements.</li>
</ul>"# weather-journal-app" 

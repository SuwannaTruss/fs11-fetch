import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  // const showWeatherDiv = document.getElementById("showWeatherContainer");

  const handleChange = e => {
    // handle key presses
    // 1. update the state of "location" with new input
    setLocation(e.target.value);
  };

  const handleSubmit = e => {
    // 1. handle form submit - take care of form behavior
    // 2. call getWeather
    e.preventDefault();
    getWeather();
    // Extra: to clear form - input field and weather display ???
    // clearForm()
    // clearDisplay()
    //  showWeatherDiv.innerHTML = "";
  };

  const getWeather = () => {
    // 2) call Open Weather API
    //    1. update the state of "loading" to true
    //    2. use fetch to call weather API (added units=metric, to get celsius)
    //    3. when received data, update the state of "loading" to false
    //    4. store weather data in state
    setLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=da7f8e54b9e0b4fc95b3220f7e345a5e`
    )
      .then(response => {
        console.log(response);
        // 3.3) Show an error if the data did not load
        if (!response.ok) {
          let errorMsg = "";
          switch (response.status) {
            case 400: // response.statusText: Bad request
              errorMsg =
                "The server could not understand the request due to invalid syntax. Please input city name.";
              break;
            case 404: // response.statusText: Not Found
              errorMsg =
                "The server can not find the requested resource. This could cause by either a mis-spelling of city name or the requested city name is not on our database. Please check your input nd try again.";
              break;
            case 408: // response.statusText: Request Timeout
              errorMsg =
                "Request Timeout. Please check your internet connention and try again.";
              break;
            case 418: // response.statusText: I'm a teapot
              errorMsg =
                "The server refuses the attempt to brew coffee with a teapot.";
              break;
            default:
              errorMsg =
                "Somethings went wrong. We are unable to display the data you requested, please try again.";
              break;
          }
          setError(errorMsg);
        } else {
          return response.json();
        }
      })
      .then(data => {
        console.log(data);
        setLoading(false);
        setWeather(data);
        // console.log(weather); // Note: We got the previous data, as the program ran to this line fater than the async function updated 'weather' state.
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="container">
      <h1>Weather Forecast</h1>
      {/* 1) Create a form 
             - use 'handleChange' to update the state of "location"*/}
      <form>
        <label htmlFor="location">
          Location:
          <input
            type="text"
            name="location"
            value={location}
            onChange={handleChange}
          />
        </label>
        <button onClick={handleSubmit}>Get weather forecast</button>
      </form>

      <div>
        {/* {error && (<p>Error: {error}</p>)}   */}
        <div id="showWeatherContainer">
          {/* 3.2) Show weather data once it has loaded */}
          {loading && <p>Loading</p>}

          {/* 3.1) Create a visual for when data is loading */}
          {weather ? (
            <div>
              <h2>Weather in {location} today:</h2>
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />
              <p>{weather.weather[0].main}</p>
              <p>Temperature: {weather.main.temp}°Celsius</p>
            </div>
          ) : (
            error && <p>{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}

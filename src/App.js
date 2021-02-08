import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const handleChange = e => {
    // handle key presses
    setLocation(e.target.value);
  };

  const handleSubmit = e => {
    // handle form submit - take care of form behavior
    // 1. update the state of "location" with new input --> Q: do it on handleChange what is the difference?
    // 2. call getWeather
    // 3. update the state of "loading" to true
    e.preventDefault();
    getWeather();
  };

  const getWeather = () => {
    // call Open Weather API
    console.log("getWeather() is called");
    console.log(location);
    setLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=da7f8e54b9e0b4fc95b3220f7e345a5e`
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        setLoading(false);
        setWeather(data);
        // console.log(weather); // Note: We got the previous data, as the program ran to this line fater than the async function updated 'weather' state.

        // }
        // // const weatherData = {
        // //   main: data.weather[0].main,
        // //   temp: data.main.temp,
        // //   sunrise: data.weather[0].sunrise,
        // //   sunset: data.weather[0].sunset
        // // }
        // // console.log(temp)
        // // console.log(weatherData);
      });
  };

  return (
    <div>
      <h1>Hello World!</h1>
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

      {/* display result section */}
      <div>
        <h2>Weather in {location} today:</h2>
        {weather ? (
          <div>
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>{weather.weather[0].main}</p>
            <p>Temperature: {weather.main.temp}°Celsius</p>
          </div>
        ) : (
          <p>No data to show</p>
        )}

        {/* <p>Temperature: {weather.main.temp}</p> */}
      </div>
    </div>
  );
}

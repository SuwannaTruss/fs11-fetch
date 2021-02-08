import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const handleChange = e => {
    // handle key presses
    // 1. update the state of "location" with new input
    setLocation(e.target.value);
  };

  const clearDisplay = e => {
    setLocation(""); // to clear form - empty input field, ready for the next input
    setWeather(null); // clear display: to clear previous weather data from display, while new data is loading.
    setError(""); // clear display: to clear previous error message from display.
  };

  const handleSubmit = e => {
    // 1. handle form submit - take care of form behavior
    // 2. call getWeather
    e.preventDefault();
    getWeather();
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
      <h1 className="mb-4">Weather Forecast</h1>
      {/* 1) Create a form 
             - use 'handleChange' to update the state of "location"*/}
      <form>
        <div className="form-group mb-2">
          <label htmlFor="location">
            Location:
            <input
              type="text"
              name="location"
              value={location}
              placeholder="Enter city name"
              onChange={handleChange}
              onClick={clearDisplay}
              className="form-control"
            />
          </label>
        </div>

        <button onClick={handleSubmit} className="btn btn-primary m-2">
          Today
        </button>
        {/* Bonus: To change to 2 compoanets and add 5-days forecast */}
        <button onclick={handleSubmit} className="btn btn-info m-2">
          5-Days
        </button>
      </form>

      <div>
        {/* {error && (<p>Error: {error}</p>)}   */}
        <div id="showWeatherContainer">
          {/* 3.2) Show weather data once it has loaded */}
          {loading && (
            <img
              src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2f37cfec-ec6f-4b62-a820-a395567c8d4e/dc8ryy8-476e53bc-37f1-4d70-8b29-eae99c0aca28.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvMmYzN2NmZWMtZWM2Zi00YjYyLWE4MjAtYTM5NTU2N2M4ZDRlXC9kYzhyeXk4LTQ3NmU1M2JjLTM3ZjEtNGQ3MC04YjI5LWVhZTk5YzBhY2EyOC5naWYifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.rT02e_8JRfxyjzT2i80lhhOLmqal92-PhTN9UXqPBe8"
              alt="loading"
            />
          )}

          {/* 3.1) Create a visual for when data is loading */}
          {weather ? (
            <div>
              <h2 className="m-4">Weather in {location} today:</h2>
              <div className="card bg-light mb-3">
                <img
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                  className="card-img"
                />
                <div className="card-img-overlay">
                  <p className="card-text">{weather.weather[0].main}</p>
                  <p className="card-text">
                    Temperature: {weather.main.temp}°Celsius
                  </p>
                </div>
              </div>
            </div>
          ) : (
            error && <p>{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}

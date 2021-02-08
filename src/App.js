import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const handleChange = e => {
    // handle key presses
    const inputLocation = e.target.value;
    setLocation(inputLocation);
  };

  const handleSubmit = e => {
    // handle form submit - take care of form behavior
    // 1. update the state of "location" with new input --> Q: do it on handleChange what is the difference?
    // 2. call getWeather
    // 3. update the state of "loading" to true
    e.preventDefault();
    getWeather();
    setLoading(true);
  };

  const getWeather = () => {
    // call Open Weather API
    console.log("getWeather() is called");
    fetch(
      "api.openweathermap.org/data/2.5/weather?q=London&appid=da7f8e54b9e0b4fc95b3220f7e345a5e"
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
      });
  };

  return (
    <div>
      <h1>Hello World!</h1>
      <form>
        <label htmlFor="location">
          Location:
          <input type="text" id="location" onChange={handleChange} />
        </label>
        <button onClick={handleSubmit}>Get weather forecast</button>
      </form>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import './App.css';
import axios from "axios";
import Current from './Components/Current';
import Forecast from './Components/Forecast';

const App = () => {
  const [city, setCity] = useState("");
  const [clickedCity, setClickedCity] = useState();
  const [citySuggest, setCitySuggest] = useState([]);

  const [current, setCurrent] = useState();
  const [location, setLocation] = useState();
  const [forecast, setForecast] = useState();

  const [darkMode, setDarkMode] = useState(false);

  const [hometown, setHometown] = useState("");
  const [hometownWeather, setHometownWeather] = useState(null);
  const [hometownSuggest, setHometownSuggest] = useState([]);

  const AutoComplete = "https://api.weatherapi.com/v1/search.json?key=83c0b17cb2774eac95723527231501&q=";
  const WeatherAPI = (city) =>
    `https://api.weatherapi.com/v1/forecast.json?key=83c0b17cb2774eac95723527231501&q=${city}&days=7&aqi=no&alerts=no`;

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
  }, [darkMode]);

  useEffect(() => {
    if (city.length > 2) {
      fetchAutoComplete(city, setCitySuggest);
    } else {
      setCitySuggest([]);
    }
  }, [city]);

  const fetchAutoComplete = async (query, setFn) => {
    try {
      const response = await axios.get(AutoComplete + query);
      const cityData = response.data.map(
        (city) => `${city.name},${city.region},${city.country}`
      );
      setFn(cityData);
    } catch (e) {
      console.log("Autocomplete error", e);
    }
  };

  const selectedCity = (city) => {
    setClickedCity(city);
    fetchWeatherAPI(city);
    setCitySuggest([]);
  };

  const fetchWeatherAPI = async (city) => {
    try {
      const response = await axios.get(WeatherAPI(city));
      const res = response.data;
      setCurrent(res.current);
      setLocation(res.location);
      setForecast(res.forecast);
    } catch (e) {
      console.log("Weather API error", e);
    }
  };

  const selectHometown = async (city) => {
    setHometown(city);
    setHometownSuggest([]);
    try {
      const response = await axios.get(WeatherAPI(city));
      setHometownWeather({
        temp: response.data.current.temp_c,
        condition: response.data.current.condition.text,
        icon: response.data.current.condition.icon,
        name: response.data.location.name
      });
    } catch (e) {
      console.log("Hometown Weather Error", e);
    }
  };

  return (
    <div>
      <div className="top-bar">
        <div className="hometown-container" style={{ position: "relative" }}>
          <input
            type="text"
            className="hometown-input"
            placeholder="Enter hometown"
            value={hometown}
            onChange={(e) => {
              setHometown(e.target.value);
              if (e.target.value.length > 2) {
                fetchAutoComplete(e.target.value, setHometownSuggest);
              } else {
                setHometownSuggest([]);
              }
            }}
          />
          {hometownSuggest.length > 0 && (
            <div className="hometown-suggestions">
              {hometownSuggest.map((city, index) => (
                <div
                  key={index}
                  className="hometown-suggestion"
                  onClick={() => selectHometown(city)}
                >
                  {city}
                </div>
              ))}
            </div>
          )}
        </div>
        {hometownWeather && (
          <div className="hometown-weather">
            <p>{hometownWeather.name}</p>
            <p>{hometownWeather.temp}°C</p>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <img src={hometownWeather.icon} alt="weather" />
              <span>{hometownWeather.condition}</span>
            </div>
          </div>
        )}
        <div className="theme-toggle">
          <span>{darkMode ? "🌙" : "☀️"}</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>

      <h1 className="weather-title">Weather Forecast</h1>

      <div className="search-container">
        <input
          type="text"
          value={city}
          className="search-input"
          placeholder="Enter Your City Name"
          onChange={(e) => {
            setCity(e.target.value);
            if (e.target.value === "") {
              setCurrent();
              setLocation();
              setClickedCity();
              setForecast();
            }
          }}
        />
        {citySuggest.map((city, index) => (
          <div
            key={index}
            className="suggestion"
            onClick={() => selectedCity(city)}
          >
            {city}
          </div>
        ))}
      </div>

      {clickedCity && (
        <>
          <div className="result-container">
            {current && <Current current={current} location={location} />}
          </div>
          <div className="result-container">
            {forecast && <Forecast forecast={forecast} location={location} />}
          </div>
        </>
      )}
    </div>
  );
};

export default App;

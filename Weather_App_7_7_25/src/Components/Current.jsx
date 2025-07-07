import React from "react";
import '../App.css';

const Current = ({ current, location }) => {
  if (!current || !location) return null;

  return (
    <div className="current-container">
      <h2 className="current-title">
        Current Weather of {location.name}, {location.region}, {location.country}
      </h2>

      <div className="weather-row">
        {/* Weather Condition */}
        <div className="weather-card weather-condition">
          <img src={current.condition.icon} alt="Weather Icon" />
          <h6>{current.condition.text}</h6>
        </div>

        {/* Temp in Celsius */}
        <div className="weather-card">
          <h3>Temp in °C: {current.temp_c}</h3>
        </div>

        {/* Temp in Fahrenheit */}
        <div className="weather-card">
          <h3>Temp in °F: {current.temp_f}</h3>
        </div>

        {/* Humidity */}
        <div className="weather-card">
          <h3>Humidity: {current.humidity}%</h3>
        </div>
      </div>
    </div>
  );
};

export default Current;

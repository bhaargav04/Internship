import React, { useState } from "react";
import '../App.css';

const Forecast = ({ forecast, location }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  if (!forecast || !location) return null;

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="forecast-container">
      <h2 className="forecast-title">
        Forecast Weather of {location.name}, {location.region}, {location.country}
      </h2>

      {forecast.forecastday.map((data, index) => (
        <div
          className={`accordion-custom ${activeIndex === index ? 'open' : ''}`}
          key={index}
        >
          <div
            className="accordion-header-custom"
            onClick={() => toggleAccordion(index)}
          >
            <div>Date: {data.date}</div>
            <div><img src={data.day.condition.icon} alt="condition" /></div>
            <div>{data.day.condition.text}</div>
            <div>Max Temp: {data.day.maxtemp_c}°C</div>
            <div>Min Temp: {data.day.mintemp_c}°C</div>
            <div>Avg Temp: {data.day.avgtemp_c}°C</div>
          </div>

          <div className="accordion-body-custom">
            {data.hour.map((hour, i) => (
              <div key={i}>
                <div className="accordion-row">
                  <h6>{hour.time}</h6>
                  <h6>Max Celsius: {hour.temp_c}°C</h6>
                  <h6>Max Fahrenheit: {hour.temp_f}°F</h6>
                </div>
                <div className="progress-bar-container">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${hour.temp_c}%` }}
                  >
                    {hour.temp_c}°C
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Forecast;

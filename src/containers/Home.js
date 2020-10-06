import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Header from "../components/Header";
import WeatherImage from "../components/WeatherImage";

const weatherKey = `dbcf13b0db9ead2deb7165b945bafc8b`;

function Home() {
  const history = useHistory();

  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Chicago");

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherKey}`
      )
      .then(function (response) {
        const weather = response.data;
        setWeatherData(weather);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [city]);

  useEffect(() => {
    const searchParams = history.location.search;
    const urlParams = new URLSearchParams(searchParams);
    const city = urlParams.get("city");
    if (city) {
      setCity(city);
    }
    console.log("urlParams", urlParams);
  }, [history]);

  const {
    cloudiness,
    currentTemp,
    highTemp,
    lowTemp,
    humidity,
    weatherType,
    windSpeed,
  } = useMemo(() => {
    let cloudiness = "";
    let currentTemp = "";
    let highTemp = "";
    let lowTemp = "";
    let humidity = "";
    let weatherType = "";
    let windSpeed = "";

    if (weatherData) {
      cloudiness = `${weatherData.clouds.all}%`;
      currentTemp = `${weatherData.main.temp}`;
      highTemp = `${weatherData.main.temp_max}`;
      lowTemp = `${weatherData.main.temp_min}`;
      humidity = `${weatherData.main.humidity}%`;
      weatherType = `${weatherData.weather[0].description}`;
      windSpeed = `${weatherData.wind.speed} km/h`;
    }

    return {
      cloudiness,
      currentTemp,
      highTemp,
      lowTemp,
      humidity,
      weatherType,
      windSpeed,
    };
  }, [weatherData]);

  console.log("weatherData", weatherData);

  return (
    <>
      <Header />
      <main className="Home">
        <h2>
          Weather in <span>{city}</span>
        </h2>
        <div className="WeatherInfo">
          <div className="WeatherInfo_Basic">
            <div className="WeatherInfo_Image">
              <WeatherImage weatherType={weatherType} />
            </div>
            <p className="WeatherInfo_Type">{weatherType}</p>
            <h3 className="Label">Current Temperature:</h3>
            <p className="WeatherInfo_Temp"> {currentTemp} </p>
          </div>

          <div className="WeatherInfo_Extra">
            <div className="WeatherInfo_Column">
              <h3 className="Label">High Temperature: </h3>
              <p className="WeatherInfo_Temp_Small">{highTemp}</p>
              <h3 className="Label">Low Temperature: </h3>
              <p className="WeatherInfo_Temp_Small">{lowTemp}</p>
            </div>
            <div className="WeatherInfo_Column">
              <h3 className="Label">Cloudiness: </h3>
              <p className="WeatherInfo_Temp_Small">{cloudiness}</p>
              <h3 className="Label">Humidity: </h3>
              <p className="WeatherInfo_Temp_Small">{humidity}</p>
              <h3 className="Label">Wind Speed: </h3>
              <p className="WeatherInfo_Temp_Small">{windSpeed}</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;

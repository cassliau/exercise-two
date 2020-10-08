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
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${weatherKey}`
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
    cloudinessValue,
    currentTemp,
    highTemp,
    lowTemp,
    humidity,
    weatherType,
    windSpeed,
  } = useMemo(() => {
    let cloudiness = "";
    let cloudinessValue = "";
    let currentTemp = "";
    let highTemp = "";
    let lowTemp = "";
    let humidity = "";
    let weatherType = "";
    let windSpeed = "";

    if (weatherData) {
      cloudiness = `${weatherData.clouds.all}%`;
      cloudinessValue = weatherData.clouds.all;
      currentTemp = `${Math.round(weatherData.main.temp)} ℉`;
      highTemp = `${Math.round(weatherData.main.temp_max)} ℉`;
      lowTemp = `${Math.round(weatherData.main.temp_min)} ℉`;
      humidity = `${weatherData.main.humidity}%`;
      weatherType = `${weatherData.weather[0].description}`;
      windSpeed = `${weatherData.wind.speed} mp/h`;
    }

    return {
      cloudiness,
      cloudinessValue,
      currentTemp,
      highTemp,
      lowTemp,
      humidity,
      weatherType,
      windSpeed,
    };
  }, [weatherData]);

  console.log("cloudiness val:", cloudinessValue);

  return (
    <>
      <Header />
      <main className="Home">
        <h2>
          weather in <span>{city}</span>
        </h2>
        <div className="WeatherInfo">
          <div
            className="WeatherInfo_Basic"
            style={{
              backgroundColor: `rgba(163,206,241,${cloudinessValue / 350})`,
            }}
          >
            <div className="WeatherInfo_Image">
              <WeatherImage weatherType={weatherType} />
            </div>
            <p className="WeatherInfo_Type">
              <span>{weatherType}</span>
            </p>
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

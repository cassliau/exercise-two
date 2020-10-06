import React, { useState, useEffect, useMemo } from "react";
//state- current state of application

import axios from "axios";

import { useHistory } from "react-router-dom";
import Header from "../components/Header";

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
        <h2>Weather in {city}</h2>
        <div className="Weather Info">
          <p>Weather Type: {weatherType}</p>
          <p>Current Temperature: {currentTemp}</p>
          <p>High Temperature: {highTemp}</p>
          <p>Low Temperature: {lowTemp}</p>
          <p>Cloudiness: {cloudiness}</p>
          <p>Humidity: {humidity}</p>
          <p>Wind Speed: {windSpeed}</p>
        </div>
      </main>
    </>
  );
}

export default Home;

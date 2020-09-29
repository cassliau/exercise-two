import React from "react";

import Header from "../components/Header";

const weatherKey = `dbcf13b0db9ead2deb7165b945bafc8b`;

function Home() {
  /* Display:
        Weather Type (ex. Cloudy)
        Current Temperature
        High Temperature
        Low Temperature
        Cloudiness
        Humidity
        Wind Speed
     */
  return (
    <>
      <Header />
      <main className="Home">
        <h2>Weather in Seoul</h2>
        <div className="Weather Info">
          <p>Weather Type: </p>
          <p>Current Temperature: </p>
          <p>High Temperature: </p>
          <p>Low Temperature: </p>
          <p>Cloudiness: </p>
          <p>Humidity: </p>
          <p>Wind Speed: </p>
        </div>
      </main>
    </>
  );
}

export default Home;

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCloud,
  faCloudRain,
  faSun,
  faSmog,
  faRainbow,
  faWind,
} from "@fortawesome/free-solid-svg-icons";

function WeatherImage({ weatherType }) {
  switch (weatherType) {
    case "clear sky":
      return <FontAwesomeIcon icon={faSun} />;
    case "light rain":
    case "moderate rain":
      return <FontAwesomeIcon icon={faCloudRain} />;
    case "overcast clouds":
      return <FontAwesomeIcon icon={faSmog} />;
    case "few clouds":
    case "scattered clouds":
    case "broken clouds":
      return <FontAwesomeIcon icon={faCloud} />;
    default:
      return <></>;
  }
}

export default WeatherImage;

import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import axios from "axios";
import {
  TiWeatherSunny,
  TiWeatherStormy,
  TiWeatherShower,
  TiWeatherDownpour,
  TiWeatherSnow,
  TiWeatherCloudy
} from "react-icons/ti";
import { BsCloudFog } from "react-icons/bs";

function Weather() {
  // 날씨정보
  const [apiData, setApiData] = useState("");
  const lat = useSelector(state => state.campSearch.lati);
  const lon = useSelector(state => state.campSearch.longi);
  console.log(lat);
  console.log(lon);
  const apiKey = process.env.REACT_APP_OPEN_WEATHER_MAP_API;
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  // const weatherSeoulURL = `https://api.openweathermap.org/data/2.5/weather?lat=37&lon=127&appid=${apiKey}`;

  // console.log(weatherSeoulURL);
  // useEffect(() => {
  //   fetch(weatherSeoulURL)
  //     .then((res) => res.json())
  //     .then((data) => setApiData(data));
  // }, [weatherSeoulURL]);
  // console.log(apiData)
  // const weatherData = JSON.stringify(apiData)
  // axios.get(weatherSeoulURL).then((responseData) => {
  //   const {data} = responseData;
  //   setApiData({
  //     id: data.weather[0].id,
  //     temperature: data.main.temp,
  //     main: data.weather[0].main,
  //     loading: false,
  //   });
  // });

  useEffect(() => {
    if (lat !== null) {
      axios.get(weatherURL).then(response => {
        console.log(response.data);
        setApiData({
          id: response.data.weather[0].id,
          temperature: response.data.main.temp,
          main: response.data.weather[0].main,
          loading: false
        });
      });
    }
  }, [weatherURL]);
  const temp = Math.ceil(apiData.temperature - 273.15);

  // eslint-disable-next-line consistent-return
  const selectIcon = () => {
    const iconId =
      apiData.id === 800 ? 0 : (parseInt(apiData.id, 10) / 100).toFixed(0);
    // eslint-disable-next-line default-case
    switch (iconId) {
      case "0":
        return <TiWeatherSunny />;
      case "2":
        return <TiWeatherStormy />;
      case "3":
        return <TiWeatherShower />;
      case "5":
        return <TiWeatherDownpour />;
      case "6":
        return <TiWeatherSnow />;
      case "7":
        return <BsCloudFog />;
      case "8":
        return <TiWeatherCloudy />;
    }
  };
  console.log(selectIcon());

  return (
    <div className="weather flex align-center justify-center fs-16">
      {lat !== null && (
        <>
          <div className="weather_icon flex align-center justify-center">
            {selectIcon()}
          </div>
          <div className="weather_celc notoMid fs-16">{temp}℃</div>
        </>
      )}
    </div>
  );
}

export default Weather;

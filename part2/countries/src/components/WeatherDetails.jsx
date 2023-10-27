import { useState, useEffect } from "react";
import axios from "axios";

const weather_key = import.meta.env.VITE_WEATHER_KEY;

const Weather = ({ country }) => {
  const [data, setData] = useState(null);

  const getWeather = (capital) => {
    const url = `http://api.weatherapi.com/v1/current.json?key=${weather_key}&q=${capital}&aqi=no`;
    axios.get(url).then((response) => {
      // setData(response.data)
      const text = response.data.current.condition.text;
      const icon = response.data.current.condition.icon;
      const temp = response.data.current.temp_c;
      setData({
        text: text,
        icon: icon,
        temp: temp,
      });
    });
  };

  useEffect(() => {
    getWeather(country.capital[0]);
  }, [country]);

  return (
    <>
      {data && (
        <>
          <h2>Current Capital Weather</h2>
          <p>Capital: {country?.capital}</p>
          <p>Condition: {data?.text}</p>
          <img src={data?.icon} alt="icon-weather" />
          <p>Temp: {data?.temp} C</p>
        </>
      )}
    </>
  );
};

export default Weather;

import { useState, useEffect } from "react";
import CountryService from "../services/countries";
import WeatherDetails from "./WeatherDetails";

const DetailCountry = ({ name }) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (name) {
      CountryService.getDetails(name).then((data) => {
        setCountry(data);
      });
    }
  }, [name]);

  if (country === null) {
    console.log("name from detail: ", name);
    return null;
  }

  const langObj = JSON.stringify(country.languages);
  const lang1 = langObj.replace(":", " ");
  const lang2 = lang1.replace(",", " ");
  const langArr = lang2.match(/[a-z]{4,}/gi);

  return (
    <>
      <div>
        <div>
          <h1>{country.name.common}</h1>
        </div>
        <div>Country Capital: {country.capital}</div>
        <div>Country Area: {country.area}</div>
        <h2>Languages</h2>
        <div>
          <ol>
            {langArr.map((lang) => (
              <li key={lang}>{lang}</li>
            ))}
          </ol>
        </div>
        <div>
          <img alt={country} src={country.flags.png}></img>
        </div>
        <WeatherDetails country={country} />
      </div>
    </>
  );
};

export default DetailCountry;

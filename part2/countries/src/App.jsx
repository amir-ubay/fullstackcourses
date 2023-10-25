import { useState, useEffect } from "react";
import React from "react";
import Country from "./services/countries";
const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const getCountries = () => {
    Country.getCountries().then((data) => {
      console.log("data: ", data);
      const initialData = data.map((country) => country.name.common);
      setCountries(initialData);
    });
  };

  useEffect(() => {
    getCountries();
  }, []);

  const handleFilter = (event) => {
    const value = event.target.value;
    setFilter(value);
    const filterCountry = countries.filter((country) =>
      country.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filterCountry);
  };

  return (
    <>
      <div>
        Find Countries: <span></span>
        <input type="text" value={filter} onChange={handleFilter} />
      </div>
      <SearchResult countries={filteredData} />
    </>
  );
};

const SearchResult = ({ countries }) => {
  if (countries > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (countries.length === 1) {
    return <DetailCountry name={countries[0]} />;
  }

  const [show, setShow] = useState("");

  const handleShow = (country) => {
    setShow(country);
    // if (show !== "") {
    //   setShow("");
    // } else {
    //   setShow(country);
    // }
  };

  return (
    <div>
      {countries.map((country) => (
        <div key={country}>
          {country}
          <span></span>
          <button onClick={() => handleShow(country)}>show</button>
        </div>
      ))}
      {/* {show && <DetailCountry name={show} />} */}
      <DetailCountry name={show} />
      <div>debug: {show}</div>
    </div>
  );
};

const DetailCountry = ({ name }) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    Country.getDetails(name).then((data) => {
      setCountry(data);
    });
  }, [name]);

  if (country === null) {
    console.log("name from detail: ", name);
    return null;
  }

  const langObj = JSON.stringify(country.languages);
  const lang1 = langObj.replace(":", " ");
  const lang2 = lang1.replace(",", " ");
  const langArr = lang2.match(/[a-z]{4,}/gi);

  console.log(langArr);

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
      </div>
    </>
  );
};

export default App;

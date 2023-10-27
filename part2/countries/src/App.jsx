import { useState, useEffect } from "react";
import React from "react";
import Country from "./services/countries";
import DetailCountry from "./components/DetailCountry";
import SearchResult from "./components/SearchResult";
import Weather from "./components/WeatherDetails";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const getCountries = () => {
    Country.getCountries().then((data) => {
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
    if (value === "") {
      setFilteredData([]);
      return;
    }
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
      <SearchResult countries={filteredData}></SearchResult>
    </>
  );
};

export default App;

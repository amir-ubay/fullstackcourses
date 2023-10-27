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
    if(value === "") {
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
      <SearchResult countries={filteredData}>
        <Weather filteredData={filteredData}/>
      </SearchResult>
      
    </>
  );
};

// const SearchResult = ({ countries }) => {
//   if (countries.length > 10) {
//     return <div>Too many matches, specify another filter</div>;
//   } else if (countries.length === 1) {
//     return <DetailCountry name={countries[0]} />;
//   }

//   const [show, setShow] = useState("");

//   const handleShow = (country) => {
//     setShow(country);
//     // if (show !== "") {
//     //   setShow("");
//     // } else {
//     //   setShow(country);
//     // }
//   };

//   return (
//     <div>
//       {countries.map((country) => (
//         <div key={country}>
//           {country}
//           <span></span>
//           <button onClick={() => handleShow(country)}>show</button>
//         </div>
//       ))}
//       {/* {show && <DetailCountry name={show} />} */}
//       <DetailCountry name={show} />
//       <div>debug: {show}</div>
//     </div>
//   );
// };


export default App;

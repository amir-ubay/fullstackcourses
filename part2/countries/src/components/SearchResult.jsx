import { useState, useEffect } from "react";
import DetailCountry from "./DetailCountry";

const SearchResult = ({ countries }) => {
  const [show, setShow] = useState("");

  const handleShow = (country) => {
    // setShow(country);
    if (show === country) {
      setShow("");
    } else {
      setShow(country);
    }
  };

  return (
    <div>
      {countries.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : countries.length === 1 ? (
        <DetailCountry name={countries[0]} />
      ) : (
        <SearchList countries={countries} handleShow={handleShow} show={show} />
      )}
      {show && <DetailCountry name={show} />}
    </div>
  );
};

const SearchList = ({ countries, handleShow, show }) => {
  return (
    <>
      {countries.map((country) => (
        <div key={country}>
          {country}
          <span></span>
          <button onClick={() => handleShow(country)}>
            {show === country ? "hide" : "show"}
          </button>
        </div>
      ))}
    </>
  );
};

export default SearchResult;

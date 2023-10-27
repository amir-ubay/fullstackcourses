import { useState, useEffect } from "react";
import DetailCountry from "./DetailCountry";

const SearchResult = ({ countries, children }) => {
    if (countries.length > 10) {
      return <div>Too many matches, specify another filter</div>;
    } else if (countries.length === 1) {
      return (
        <>
          <DetailCountry name={countries[0]} />
          {children}
        </>
      );
    }
  
    const [show, setShow] = useState("");
  
    const handleShow = (country) => {
      // setShow(country);
        if (show === country) {
          setShow("");
        }
      else {
        setShow(country);
      }
    };
  
    return (
      <div>
        {countries.map((country) => (
          <div key={country}>
            {country}
            <span></span>
            <button onClick={() => handleShow(country)}>{show === country ? "hide" : "show"}</button>
          </div>
        ))}
        {show && <DetailCountry name={show} />}
        {children}
      </div>
    );
  };

  export default SearchResult;
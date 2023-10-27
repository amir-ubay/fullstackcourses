import { useState, useEffect } from "react";
import CountryService from "../services/countries";
import axios from "axios";

const Weather = ({filteredData}) => {

    const [capital, setCapital] = useState("");
    const [data, setData] = useState(null)

    const getWeather = (capital) => {
        const url = `http://api.weatherapi.com/v1/current.json?key=ab216061259e4cb2b7632907221312&q=${capital}&aqi=no`
        axios
            .get(url)
            .then(response => {
                // setData(response.data)
                const text = response.data.current.condition.text
                const icon = response.data.current. condition.icon
                const temp = response.data.current.temp_c
                console.log("capital", capital);
                console.log("text: ", text);
                console.log("icon: ", icon);
                console.log("temp: ", temp);
                setData({
                    text: text,
                    icon: icon,
                    temp: temp
                })
            })
    }

    useEffect(() => {
        if(filteredData.length === 1) {
            const theCountry = filteredData[0];
            CountryService.getDetails(theCountry)
                .then((data) => {
                    const theCapital = data.capital[0];
                    setCapital(theCapital)
                    getWeather(theCapital);
                })
        } else {
            setData(null)
        }
    },[filteredData])

    return (
        <>
            {data && (
                <>
                <h2>Current Capital Weather</h2>
                    <p>Capital: {capital}</p>
            <p>Condition: {data?.text}</p>
            <img src={data?.icon} alt="icon-weather" />
            <p>Temp: {data?.temp} C</p>
                </>
            )}
        </>
    )
}

export default Weather;
import axios from "axios";

const getCountries = () => {
    const request = axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
    return request.then(response => response.data)
};

const getDetails = (code) => {
    const request = axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${code}`)
    return request.then(response => response.data)
}

export default { getCountries, getDetails };
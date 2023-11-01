import axios from "axios";
const baseUrl = "/info";

const getMain = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export default { getMain };

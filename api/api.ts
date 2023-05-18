import axios from "axios";
import config from "./config";

console.log(config.IP_DEV)
const apiURL = `http://${config.IP_DEV}`;

const api = axios.create({
  baseURL: `${apiURL}`,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json;charset=UTF-8",
  },
});

// api.defaults.timeout = 3000;

export default api;

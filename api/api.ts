import axios from "axios";
import config from "./config";

const apiURL = `http://192.168.0.108:3000`;

const api = axios.create({
  baseURL: `${apiURL}`,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json;charset=UTF-8",
  },
});

api.defaults.timeout = 3000;

export default api;

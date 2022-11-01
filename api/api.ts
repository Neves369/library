import axios from "axios";

const apiIPDEV = "191.252.193.56:9444"; //7
const apiIPPRODUCAO = "191.252.103.92:9443"; //5
const apiURL = `http://192.168.0.105:3000`;

const api = axios.create({
  baseURL: `${apiURL}`,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json;charset=UTF-8",
  },
});

export default api;

import axios from "axios";

const apiIPDEV = "191.252.193.56:9444"; //7
const apiIPPRODUCAO = "191.252.103.92:9443"; //5
const apiURL = `http://${apiIPPRODUCAO}/sgb2api/v1`;

const api = axios.create({
  baseURL: `${apiURL}`,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json;charset=UTF-8",
    Authorization:
      "Basic MWJhMWIwZjEtYTk5Mi00NjRiLTk3MDctZWZmMzNhMGRlYzY1OjA1NTNlNjM3LTVhY2EtNDIyMS1hMjAxLTZmNTViY2FkMDEwNA==",
  },
});

export default api;

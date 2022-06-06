import axios from "axios";

export const ffxivAPIClient = axios.create({
  baseURL: "http://xivapi.local",
  headers: {
    "Content-type": "application/json",
  },
});

export const databaseClient = axios.create({
  baseURL: "http://localhost:5000",
  headers : {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*"
  }
})
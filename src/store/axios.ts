import axios from "axios";

// set intial url of axios
const API = axios.create({
  baseURL: "http://localhost:3000/",
});

export default API;

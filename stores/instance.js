import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.100.118:8090",
});

export default instance;

//danah#1- 192.168.8.144 // student wifi  192.168.100.118

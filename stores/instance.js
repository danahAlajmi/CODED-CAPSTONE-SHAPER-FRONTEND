import axios from "axios";

const instance = axios.create({
  baseURL: "http://172.20.10.2:8090",
});

export default instance;

//danah#1- 192.168.8.144 // student wifi  192.168.100.118
//mohammad#1 iphone in coded - 172.20.10.2

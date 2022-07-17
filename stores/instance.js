import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.100.118:8090",
});

export default instance;

//danah#1- 192.168.8.144 // student wifi  192.168.100.118 // phone 172.20.10.5
//mohammad#1 iphone in coded - 172.20.10.2 - mohammad students in coded - 192.168.100.38 // mohammad's tempest 2 - 192.168.8.175
// Ali Home 192.168.1.5 - Ali coded 192.168.100.151 Ali Phone 192.168.43.154

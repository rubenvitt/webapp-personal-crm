import axios from "axios";
import { URL_APP } from "./global/urls";

const instance = axios.create({
  baseURL: URL_APP + "/api",
});

export default instance;

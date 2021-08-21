import axios from "axios";
import { URL_APP } from "./global/urls";

export const apiAxios = axios.create({
  baseURL: URL_APP + "/api",
});

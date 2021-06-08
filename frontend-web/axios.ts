import axios from "axios";

const instance = axios.create({
  baseURL:
    process.env.API_HOST ||
    process.env.REACT_APP_VERCEL_URL ||
    "http://localhost:3000",
});

export default instance;

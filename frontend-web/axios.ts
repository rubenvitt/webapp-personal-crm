import axios from "axios";

const instance = axios.create({
  baseURL:
    process.env.API_HOST ||
    process.env.NEXT_PUBLIC_VERCEL_URL ||
    "http://localhost:3000",
});

export default instance;

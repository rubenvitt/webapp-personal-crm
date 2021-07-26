import axios from "axios";

const instance = axios.create({
  baseURL:
    (!process.env.NEXT_PUBLIC_VERCEL_URL
      ? "http://localhost:" + (process.env.PORT || 3003)
      : "") + "/api",
});

export default instance;

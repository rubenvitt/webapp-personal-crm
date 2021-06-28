import axios from "axios";

const instance = axios.create({
  baseURL:
    (process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:" + (process.env.PORT || 3000)) + "/api",
});

export default instance;

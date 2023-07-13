import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://myblog-api.fly.dev/api",
});

export default axiosInstance;

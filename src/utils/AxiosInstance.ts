import axios from "axios";
import { localStorage } from "./storage";

const AxiosInstance = (contentType = "application/json") => {
  const axiosInstance = axios.create({
    baseURL: "https://sever-task-manager.onrender.com/",
  //  baseURL: "http://localhost:3000/",
    timeout: 10000
  });
  axiosInstance.interceptors.request.use(
    async (config: any) => {
      const token = localStorage.getString("token");
      config.headers = {
        "Authorization": `${token}`,
        "Accept": "application/json",
        "Content-Type": contentType
      };
      return config;
    },
    err => Promise.reject(err)
  );

  axiosInstance.interceptors.response.use(
    res => res.data,
    err => Promise.reject(err)

  );
  return axiosInstance;
};

export default AxiosInstance;

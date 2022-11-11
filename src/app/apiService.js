import axios from "axios";
import { BASE_URL } from "./config";

export const apiService = axios.create({
  baseURL: BASE_URL,
});

apiService.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {
    console.log("Request error", error);
    return Promise.reject(error);
  }
);

apiService.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("Response error", error);
    return Promise.reject(error);
  }
);

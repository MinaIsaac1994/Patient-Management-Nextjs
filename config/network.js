import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/",
  timeout: 2000,
});

const simpleErrorHandling = (err, defaultText = "") => {
  if (err?.message) {
    throw err;
  } else {
    throw new Error(defaultText);
  }
};

export { simpleErrorHandling };

export default axiosInstance;

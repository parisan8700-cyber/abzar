import axios from "axios";

const Fetch = axios.create({
  baseURL: "https://backabzar.onrender.com",
  headers: { "Content-Type": "application/json" },
});

Fetch.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (config.token === true) {
      if (!token) {
        return Promise.reject(new Error("توکن یافت نشد"));
      }
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

Fetch.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default Fetch;

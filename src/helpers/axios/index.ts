import axios from "axios";

const authInstance = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:8000",
});

authInstance.interceptors.request.use(
  function(config) {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) config.headers["authorization"] = accessToken;
    return config;
  },
  async function(error) {
    return await Promise.reject(error);
  },
);

authInstance.interceptors.response.use(
  function(response) {
    return response;
  },
  async function(error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await authInstance.get("auth/token/refresh/");
        localStorage.setItem("access_token", response.headers["authorization"]);
        return authInstance(originalRequest);
      } catch (e) {
        if (e.response.status === 400 || e.response.status === 500) {
          localStorage.removeItem("access_token");
          window.dispatchEvent(new Event("storage"));
          const response = await authInstance.post("auth/logout/");
          if (response.status === 200) {
            window.dispatchEvent(new Event("storage"));
          }
        }
      }
    }
    if (error.response.status === 500) {
      localStorage.setItem("access_token", "");
    }
    return Promise.reject(error);
  },
);

export default authInstance;

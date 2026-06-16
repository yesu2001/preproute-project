import axios from "axios";

const api = axios.create({
  baseURL: "https://admin-moderator-backend-staging.up.railway.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const authStorageString = localStorage.getItem("auth-storage");
  let token: string | null = null;

  if (authStorageString) {
    try {
      const parsed = JSON.parse(authStorageString);
      token = parsed?.state?.token;
    } catch (e) {
      console.error("Failed to parse auth-storage", e);
    }
  }

  if (!token) {
    token = localStorage.getItem("token");
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const requestUrl = error.config?.url;
      const skipAuthRedirect = (error.config as any)?.skipAuthRedirect;

      if (requestUrl !== "/auth/login" && !skipAuthRedirect) {
        localStorage.removeItem("auth-storage");
        localStorage.removeItem("token");

        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export default api;

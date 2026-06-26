import axios from "axios";

const api = axios.create({
    baseURL: "https://ai-job-portal-ww2o.onrender.com/api",
});

api.interceptors.request.use((config) => {

    if (
        config.url === "/auth/register/" ||
        config.url === "/token/"
    ) {
        return config;
    }

    const token = localStorage.getItem("access_token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;
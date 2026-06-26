import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {

    // Don't send token for register and login
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
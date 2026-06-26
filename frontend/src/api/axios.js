import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000/api",
});

api.interceptors.request.use((config) => {

    // Don't send token when registering or logging in
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
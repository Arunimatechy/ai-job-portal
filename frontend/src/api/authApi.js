import api from "./axios";

// LOGIN
export const loginUser = async (data) => {
    const res = await api.post("/token/", data);
    return res.data;
};

// REGISTER
export const registerUser = async (data) => {
    const res = await api.post("/auth/register/", data);
    return res.data;
};
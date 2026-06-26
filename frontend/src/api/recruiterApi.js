import api from "./axios";

export const getDashboardStats = async () => {

    const response =
        await api.get(
            "/jobs/dashboard/"
        );

    return response.data;
};
import api from "./axios";

export const getDashboardData = async () => {

    const response =
        await api.get(
            "/jobs/candidate-dashboard/"
        );

    return response.data;
};
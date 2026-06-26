import api from "./axios";

export const analyzeResume = async () => {
    const response = await api.post("/ai/analyze/");
    return response.data;
};

export const getMyAnalysis = async () => {
    const response = await api.get("/ai/my-analysis/");
    return response.data;
};

export const getRecommendedJobs = async () => {
    const response = await api.get("/ai/recommendations/");

    console.log("RECOMMENDATIONS API:", response.data);

    return response.data;
};
import api from "./axios";


export const analyzeResume = async()=>{

    const response =
        await api.post(
            "/ai/analyze/"
        );

    return response.data;

};

export const getCandidateRanking =
async (jobId) => {

  const response =
    await api.get(
      `/ai/ranking/${jobId}/`
    );

  return response.data;
};

export const getMyAnalysis = async()=>{

    const response =
        await api.get(
            "/ai/my-analysis/"
        );

    return response.data;

};
import api from "./axios";

export const generateInterviewKit = async (
  jobId
) => {
  const response = await api.post(
    `/interviews/generate/${jobId}/`
  );

  return response.data;
};

export const getInterviewKit = async (
  jobId
) => {
  const response = await api.get(
    `/interviews/detail/${jobId}/`
  );

  return response.data;
};

export const scheduleInterview = async (
  data
) => {
  const response = await api.post(
    "/interviews/schedule/",
    data
  );

  return response.data;
};

export const getMyInterviews = async () => {
  const response = await api.get(
    "/interviews/my-interviews/"
  );

  return response.data;
};

export const getShortlistedApplicants =
  async () => {

    const response =
      await api.get(
        "/interviews/shortlisted-applicants/"
      );

    return response.data;
};
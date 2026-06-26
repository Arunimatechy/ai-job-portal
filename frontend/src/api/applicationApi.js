import api from "./axios";

export const applyJob = async (jobId) => {
  const response = await api.post(
    "/applications/apply/",
    {
      job: jobId,
    }
  );

  return response.data;
};

export const getMyApplications =
  async () => {
    const response =
      await api.get(
        "/applications/my-applications/"
      );

    return response.data;
  };

export const getJobApplicants =
  async (jobId) => {
    const response =
      await api.get(
        `/applications/job/${jobId}/`
      );

    return response.data;
  };

export const updateApplicationStatus =
  async (id, status) => {
    const response =
      await api.patch(
        `/applications/${id}/status/`,
        { status }
      );

    return response.data;
  };
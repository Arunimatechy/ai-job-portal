import api from "./axios";

export const getJobs = async () => {
  const response = await api.get("/jobs/");
  return response.data;
};

export const getJobDetail = async (id) => {
  const response = await api.get(`/jobs/${id}/`);
  return response.data;
};

// Recruiter jobs
export const getMyJobs = async () => {
  const response = await api.get("/jobs/my-jobs/");
  return response.data;
};

// Create Job
export const createJob = async (data) => {
  const response = await api.post(
    "/jobs/create/",
    data
  );

  return response.data;
};

// Update Job
export const updateJob = async (
  id,
  data
) => {
  const response = await api.put(
    `/jobs/update/${id}/`,
    data
  );

  return response.data;
};

// Delete Job
export const deleteJob = async (id) => {
  const response = await api.delete(
    `/jobs/delete/${id}/`
  );

  return response.data;
};
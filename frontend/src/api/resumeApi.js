import api from "./axios";

// Get Resume
export const getMyResume =
  async () => {
    const response =
      await api.get(
        "/resumes/me/"
      );

    return response.data;
  };

// Upload Resume
export const uploadResume =
  async (file) => {
    const formData =
      new FormData();

    formData.append(
      "resume",
      file
    );

    const response =
      await api.post(
        "/resumes/upload/",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;
  };

// Delete Resume
export const deleteResume =
  async () => {
    const response =
      await api.delete(
        "/resumes/delete/"
      );

    return response.data;
  };
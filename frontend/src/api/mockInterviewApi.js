import api from "./axios";

export const evaluateAnswer =
  async (data) => {

    const response =
      await api.post(
        "/mock-interview/evaluate/",
        data
      );

    return response.data;
};
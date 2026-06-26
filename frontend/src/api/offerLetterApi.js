import api from "./axios";

export const generateOfferLetter =
  async (applicationId, salary) => {

    const response =
      await api.post(
        `/offer-letters/generate/${applicationId}/`,
        {
          salary,
        }
      );

    return response.data;
};

export const getOfferLetter =
  async (applicationId) => {

    const response =
      await api.get(
        `/offer-letters/detail/${applicationId}/`
      );

    return response.data;
};
import api from "./axios";

export const getAIScreening =
  async () => {

    const response =
      await api.get(
        "/ai/screening/"
      );

    return response.data;
};
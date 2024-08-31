import { AxiosError } from "axios";

export const getAxiorError = (error: AxiosError) => {
  return error.response?.data;
};

import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export const getAccessToken = () => {
  const params = new URLSearchParams(window.location.search);
  const accessToken = params.get("access_token");

  return accessToken;
};

export const axiosRequest = <T = any>(
  url: string,
  method: string,
  headers: any
): Promise<AxiosResponse<T>> => {
  const config: AxiosRequestConfig = {
    url,
    method,
    headers,
  };
  return axios.request<T>(config);
};

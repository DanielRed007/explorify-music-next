import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export const getAccessToken = (): string | null => {
  const params = new URLSearchParams(window.location.search);
  const accessToken = params.get("access_token");

  return accessToken;
};

export const getRefreshToken = (): string | null => {
  const params = new URLSearchParams(window.location.search);
  const refreshToken = params.get("refresh_token");

  return refreshToken;
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

export const preserveQueryParameters = (
  basePath: string,
  query: any
): string => {
  const queryString = new URLSearchParams(query).toString();
  return `${basePath}?${queryString}`;
};

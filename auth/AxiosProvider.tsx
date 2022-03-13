import axios, { AxiosError, AxiosInstance } from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import React, { createContext, useContext, useMemo } from 'react';
import axiosApiConfig from '../backend/config/AxiosApiConfig';
import AxiosUnauthInstance from '../backend/config/AxiosUnauthInstance';
import { IRefreshTokenRequest } from '../Types/requestTypes/IRefreshTokenRequest';
import { useAuth } from './AuthContext';

export const AxiosContext = createContext<AxiosInstance>(undefined);

async function refreshTokenRequest(
  refreshTokenRequestData: IRefreshTokenRequest
) {
  return AxiosUnauthInstance({
    method: 'POST',
    url: `/auth/refreshtoken`,
    data: refreshTokenRequestData,
  });
}

// hack to get around getting the most updated access token.
function getAccessToken() {
  return localStorage.getItem('accessToken')?.replace(/['"]+/g, '');
}

export default function AxiosProvider({
  children,
}: React.PropsWithChildren<unknown>) {
  const { refreshToken, setAccessToken, logout } = useAuth();

  const axiosInstance = useMemo(() => {
    const AxiosApiInstance = axios.create({
      baseURL: axiosApiConfig.baseURL,
      headers: axiosApiConfig.headers,
      timeout: axiosApiConfig.timeout,
      httpsAgent: axiosApiConfig.httpsAgent,
      withCredentials: axiosApiConfig.withCredentials,
    });

    AxiosApiInstance.interceptors.request.use((request) => {
      request.headers.Authorization = getAccessToken();
      return request;
    });
    const refreshAuthLogic = (failedRequest: any) =>
      refreshTokenRequest({ refreshToken: refreshToken || '' })
        .then((tokenRefreshResponse) => {
          setAccessToken(tokenRefreshResponse.data.token);
          failedRequest.response.config.headers.Authorization =
            tokenRefreshResponse.data.token;
          return Promise.resolve();
        })
        .catch((err: AxiosError) => {
          if (
            err.response?.status === 400 ||
            err.response?.status === 401 ||
            err.response?.status === 403
          ) {
            logout();
          }
        });

    createAuthRefreshInterceptor(AxiosApiInstance, refreshAuthLogic, {
      statusCodes: [401, 403],
    });
    return AxiosApiInstance;
  }, [logout, refreshToken, setAccessToken]);

  return (
    <AxiosContext.Provider value={axiosInstance}>
      {children}
    </AxiosContext.Provider>
  );
}

export function useAxios() {
  return useContext(AxiosContext);
}

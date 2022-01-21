import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { IRefreshTokenRequest } from '../../Types/requestTypes/IRefreshTokenRequest';
import axiosApiConfig from './AxiosApiConfig';

const AxiosApiInstance = axios.create({
  baseURL: axiosApiConfig.baseURL,
  headers: axiosApiConfig.headers,
  timeout: axiosApiConfig.timeout,
  httpsAgent: axiosApiConfig.httpsAgent,
  withCredentials: axiosApiConfig.withCredentials,
});

// cant use hooks here.
function getAccessToken() {
  return localStorage.getItem('accessToken')?.replace(/['"]+/g, '');
}
function getRefreshToken() {
  return localStorage.getItem('refreshToken')?.replace(/['"]+/g, '');
}

function setAccessToken(accessToken: string) {
  localStorage.setItem('accessToken', accessToken);
}

async function refreshTokenRequest(
  refreshTokenRequestData: IRefreshTokenRequest
) {
  return AxiosApiInstance({
    method: 'POST',
    url: '/auth/refreshtoken',
    data: refreshTokenRequestData,
  });
}

// Use interceptor to inject the token to requests
AxiosApiInstance.interceptors.request.use((request) => {
  const accessToken = getAccessToken() || '';
  request.headers.Authorization = accessToken;
  return request;
});
const refreshAuthLogic = (failedRequest: any) =>
  refreshTokenRequest({ refreshToken: getRefreshToken() || '' }).then(
    (tokenRefreshResponse) => {
      console.log('Getting new access token with refresh token.');
      setAccessToken(tokenRefreshResponse.data.token);
      failedRequest.response.config.headers.Authorization =
        tokenRefreshResponse.data.token;
      return Promise.resolve();
    }
  );

createAuthRefreshInterceptor(AxiosApiInstance, refreshAuthLogic, {
  statusCodes: [401, 403],
});

export default AxiosApiInstance;

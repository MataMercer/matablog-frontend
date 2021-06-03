/* eslint-disable no-param-reassign */
import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import https from 'https';

const accessTokenKey = 'accessToken';
const refreshTokenKey = 'refreshToken';
const accessTokenPrefix = 'Bearer ';

const getAccessToken = () => {
  return localStorage.getItem(accessTokenKey);
};

const setAccessToken = (accessToken: string) => {
  localStorage.setItem(accessTokenKey, accessToken);
};

const getRefreshToken = () => {
  return localStorage.getItem(refreshTokenKey);
};

const setRefreshToken = (refreshToken: string) => {
  localStorage.setItem(refreshTokenKey, refreshToken);
};

const clearTokens = () => {
  localStorage.removeItem(accessTokenKey);
  localStorage.removeItem(refreshTokenKey);
};

const axiosConfig = {
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
  baseURL: 'http://localhost:8080/',
  timeout: 2000,
  headers: {
    'Access-Control-Allow-Headers': 'Authorization',
  },
  withCredentials: true,
};

axios.defaults.baseURL = axiosConfig.baseURL;
axios.defaults.headers = axiosConfig.headers;
// axios.defaults.timeout = axiosConfig.timeout;
axios.defaults.httpsAgent = axiosConfig.httpsAgent;
axios.defaults.withCredentials = axiosConfig.withCredentials;

const refreshAuthLogic = (failedRequest: any) =>
  axios.post('/api/user/refreshtoken').then((tokenRefreshResponse) => {
    console.log('INTERCEPTED');
    setAccessToken(tokenRefreshResponse.data.token);
    failedRequest.response.config.headers.Authorization = getAccessToken();
    return Promise.resolve();
  });

createAuthRefreshInterceptor(axios, refreshAuthLogic, {
  statusCodes: [401], // default: [ 401 ]
});
console.log('axios initialized');
export { setAccessToken, getAccessToken, setRefreshToken, clearTokens };

/* eslint-disable no-param-reassign */
import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import https from 'https';
import useAuthToken from './useAuthToken';

function useAxiosConfig() {
  const [accessToken, refreshToken, setAccessToken, setRefreshToken] =
    useAuthToken();
  const axiosConfig = {
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
    baseURL: 'http://localhost:8080/',
    timeout: 2000,
    headers: {
      'Access-Control-Allow-Headers': ['Authorization', 'refreshToken'],
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
      console.log('I-I-INTERCEPTED!');
      setAccessToken(tokenRefreshResponse.data.token);
      failedRequest.response.config.headers.Authorization = accessToken;
      return Promise.resolve();
    });

  createAuthRefreshInterceptor(axios, refreshAuthLogic, {
    statusCodes: [401], // default: [ 401 ]
  });
}

export default useAxiosConfig;

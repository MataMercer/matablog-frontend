/* eslint-disable no-param-reassign */
import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { useEffect } from 'react';
import useAuthToken from './useAuthToken';
import axiosConfig from '../config/AxiosConfig';

function useAxiosConfig() {
  const { accessToken, refreshToken, setAccessToken, setRefreshToken } =
    useAuthToken();

  axios.defaults.baseURL = axiosConfig.baseURL;
  axios.defaults.headers = axiosConfig.headers;
  axios.defaults.timeout = axiosConfig.timeout;
  axios.defaults.httpsAgent = axiosConfig.httpsAgent;
  axios.defaults.withCredentials = axiosConfig.withCredentials;

  useEffect(() => {
    console.log('Set interceptor');
    const refreshAuthLogic = (failedRequest: any) =>
      axios.post('/api/user/refreshtoken').then((tokenRefreshResponse) => {
        setAccessToken(tokenRefreshResponse.data.token);
        failedRequest.response.config.headers.Authorization = accessToken;
        return Promise.resolve();
      });

    createAuthRefreshInterceptor(axios, refreshAuthLogic, {
      statusCodes: [401],
    });
  }, []);

  useEffect(() => {
    axios.defaults.headers.Authorization = accessToken;
  }, [accessToken]);
}

export default useAxiosConfig;

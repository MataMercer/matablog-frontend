/* eslint-disable no-param-reassign */
import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { useEffect, useState } from 'react';
import axiosConfig from '../config/AxiosConfig';

type useAxiosConfigProps = {
  accessToken?: string;
  setAccessToken: (accessToken: any) => void;
};

function useAxiosConfig({ accessToken, setAccessToken }: useAxiosConfigProps) {
  const [authorization, setAuthorization] = useState('');

  axios.defaults.baseURL = axiosConfig.baseURL;
  axios.defaults.headers = axiosConfig.headers;
  axios.defaults.timeout = axiosConfig.timeout;
  axios.defaults.httpsAgent = axiosConfig.httpsAgent;
  axios.defaults.withCredentials = axiosConfig.withCredentials;

  useEffect(() => {
    const refreshAuthLogic = (failedRequest: any) =>
      axios.post('/api/user/refreshtoken').then((tokenRefreshResponse) => {
        console.log('Getting new access token with refresh token.');
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
    setAuthorization(axios.defaults.headers.Authorization);
  }, [accessToken]);

  return { authorization };
}

export default useAxiosConfig;

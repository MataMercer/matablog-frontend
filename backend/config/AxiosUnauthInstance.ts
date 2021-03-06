import axios from 'axios';
import axiosApiConfig from './AxiosApiConfig';

const UnauthAxiosInstance = axios.create({
  baseURL: axiosApiConfig.baseURL,
  timeout: axiosApiConfig.timeout,
  httpsAgent: axiosApiConfig.httpsAgent,
  withCredentials: axiosApiConfig.withCredentials,
});
export default UnauthAxiosInstance;

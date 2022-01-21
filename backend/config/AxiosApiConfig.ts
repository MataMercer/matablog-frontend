import https from 'https';

const axiosApiConfig = {
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
  baseURL: 'http://localhost:8080/api/v1/',
  timeout: 10000,
  headers: {
    'Access-Control-Allow-Headers': ['Authorization', 'refreshToken'],
  },
  withCredentials: true,
};

export default axiosApiConfig;

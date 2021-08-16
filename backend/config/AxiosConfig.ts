import https from 'https';

const axiosConfig = {
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
  baseURL: 'http://localhost:8080/api/v1/',
  timeout: 2000,
  headers: {
    'Access-Control-Allow-Headers': ['authorization', 'refreshtoken'],
  },
  withCredentials: true,
};

export default axiosConfig;

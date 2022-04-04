import { AxiosInstance } from 'axios';
import { IAuthTokens } from '../../Types/IAuthTokens';

// eslint-disable-next-line import/prefer-default-export
export function getOAuthCodeExchangeRequest(
  axios: AxiosInstance,
  code: String
) {
  return axios({
    method: 'GET',
    url: '/oauth/github',
    params: { code },
  }).then((response) => {
    const authTokenRes: IAuthTokens = {
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken,
    };
    return authTokenRes;
  });
}

/* eslint-disable import/prefer-default-export */
import { AxiosInstance } from 'axios';
import { IAuthTokens } from '../../Types/IAuthTokens';
import { ILoginRequest } from '../../Types/requestTypes/ILoginRequest';
import IUser from '../../Types/IUser';
import { IRefreshTokenRequest } from '../../Types/requestTypes/IRefreshTokenRequest';

export async function loginRequest(
  axios: AxiosInstance,
  { username, password }: ILoginRequest
) {
  const data = {
    username,
    password,
  };

  return axios({
    method: 'POST',
    url: '/auth/login',
    data,
  }).then((response) => {
    const authTokenRes: IAuthTokens = {
      accessToken: response.headers.authorization,
      refreshToken: response.headers.refreshtoken,
    };
    return authTokenRes;
  });
}

export async function getCurrentUserRequest(axios: AxiosInstance) {
  const response = await axios({ method: 'GET', url: '/user/currentuser' });
  return response.data as IUser;
}

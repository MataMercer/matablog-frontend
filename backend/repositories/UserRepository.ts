import { AxiosInstance } from 'axios';
import { IAuthTokens } from '../../Types/IAuthTokens';
import { ILoginRequest } from '../../Types/requestTypes/ILoginRequest';
import IUser from '../../Types/IUser';
import { IRefreshTokenRequest } from '../../Types/requestTypes/IRefreshTokenRequest';
import api from '../config/AxiosApiInstance';

export async function loginRequest({ username, password }: ILoginRequest) {
  const data = {
    username,
    password,
  };

  return api({
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

export async function getCurrentUserRequest() {
  return api({
    method: 'get',
    url: '/user/currentuser',
  }).then((response) => {
    const userRes: IUser = {
      id: response.data.id,
      username: response.data.username,
      activeBlog: response.data.activeBlog,
    };
    return userRes;
  });
}

export async function refreshTokenRequest(
  refreshTokenRequestData: IRefreshTokenRequest
) {
  return api({
    method: 'POST',
    url: '/auth/refreshtoken',
    data: refreshTokenRequestData,
  });
}

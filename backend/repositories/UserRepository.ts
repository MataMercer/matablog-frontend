import axios from 'axios';
import { IAuthTokens } from '../../modelTypes/IAuthTokens';
import { ILoginForm } from '../../modelTypes/formTypes/ILoginForm';
import { IUser } from '../../modelTypes/IUser';

async function loginRequest({ username, password }: ILoginForm) {
  const data = {
    username,
    password,
  };

  return axios({
    method: 'POST',
    url: '/auth/login',
    headers: {
      'content-type': 'application/json',
    },
    data,
  }).then((response) => {
    const authTokenRes: IAuthTokens = {
      accessToken: response.headers.authorization,
      refreshToken: response.headers.refreshtoken,
    };
    return authTokenRes;
  });
}

async function getCurrentUserRequest() {
  return axios({
    method: 'get',
    url: '/user/currentuser',
  }).then((response) => {
    const userRes: IUser = {
      username: response.data,
    };
    return userRes;
  });
}

export { getCurrentUserRequest, loginRequest };

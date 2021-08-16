import axios from 'axios';
import { AuthTokens } from '../../modelTypes/AuthTokens';
import { ILoginForm } from '../../modelTypes/formTypes/loginForm';
import { User } from '../../modelTypes/User';

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
    const authTokenRes: AuthTokens = {
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
    const userRes: User = {
      username: response.data,
    };
    return userRes;
  });
}

export { getCurrentUserRequest, loginRequest };

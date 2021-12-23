import axios from 'axios';
import { IAuthTokens } from '../../Types/IAuthTokens';
import { ILoginRequest } from '../../Types/requestTypes/ILoginRequest';
import IUser from '../../Types/IUser';

async function loginRequest({ username, password }: ILoginRequest) {
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

async function getCurrentUserRequest() {
  return axios({
    method: 'get',
    url: '/user/currentuser',
  }).then((response) => {
    console.log(response);
    const userRes: IUser = {
      id: response.data.id,
      username: response.data.username,
      activeBlog: response.data.activeBlog,
    };
    return userRes;
  });
}



export { getCurrentUserRequest, loginRequest };

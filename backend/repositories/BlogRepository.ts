import { AxiosInstance } from 'axios';
import IBlog from '../../Types/IBlog';
import IFollow from '../../Types/IFollow';
import { IPage } from '../../Types/IPage';
import { IFollowRequest } from '../../Types/requestTypes/IFollowRequest';
import { IPageRequest } from '../../Types/requestTypes/IPageRequest';

async function getBlogByNameRequest(axios: AxiosInstance, blogName: String) {
  const response = await axios({
    method: 'get',
    url: `/blog/name/${blogName}`,
  });
  return {
    ...response.data,
  } as IBlog;
}

async function getBlogByIdRequest(axios: AxiosInstance, id: String) {
  const response = await axios({
    method: 'get',
    url: `/blog/${id}`,
  });
  return {
    ...response.data,
  } as IBlog;
}

async function getFollowersRequest(
  axios: AxiosInstance,
  id: string,
  pageRequest: IPageRequest
) {
  const response = await axios({
    method: 'get',
    url: `/blog/${id}/followers`,
    params: pageRequest,
  });
  return {
    ...response.data,
  } as IPage<IFollow>;
}

async function getFollowingRequest(
  axios: AxiosInstance,
  id: string,
  pageRequest: IPageRequest
) {
  const response = await axios({
    method: 'get',
    url: `/blog/${id}/following`,
    params: pageRequest,
  });
  return {
    ...response.data,
  } as IPage<IFollow>;
}

async function followBlogRequest(
  axios: AxiosInstance,
  id: string,
  isFollow: boolean,
  followRequest: IFollowRequest
) {
  const response = await axios({
    method: isFollow ? 'POST' : 'DELETE',
    url: `/blog/${id}/follow`,
    data: followRequest,
  });
  return response.data;
}

export {
  getBlogByNameRequest,
  getBlogByIdRequest,
  followBlogRequest,
  getFollowersRequest,
  getFollowingRequest,
};

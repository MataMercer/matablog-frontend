import { AxiosInstance } from 'axios';
import IBlog from '../../Types/IBlog';
import IFollow from '../../Types/IFollow';
import ILike from '../../Types/ILike';
import { IPage } from '../../Types/IPage';
import { IBlogProfileRequest } from '../../Types/requestTypes/IBlogProfileRequest';
import { IFollowRequest } from '../../Types/requestTypes/IFollowRequest';
import { IPageRequest } from '../../Types/requestTypes/IPageRequest';
import { objectToFormData } from '../../util/FormDataUtil';

async function getBlogByNameRequest(axios: AxiosInstance, blogName: String) {
  const response = await axios({
    method: 'get',
    url: `/blog/name/${blogName}`,
  });
  return {
    ...response.data,
  } as IBlog;
}

async function getBlogByIdRequest(axios: AxiosInstance, id: string) {
  const response = await axios({
    method: 'get',
    url: `/blog/${id}`,
  });
  return {
    ...response.data,
  } as IBlog;
}

async function getBlogLikesRequest(axios: AxiosInstance, id: string) {
  const response = await axios({
    method: 'get',
    url: `/blog/${id}/likes`,
  });
  return {
    ...response.data,
  } as IPage<ILike>;
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

async function getCurrentBlogRequest(axios: AxiosInstance) {
  const response = await axios({
    method: 'get',
    url: `/blog/currentblog`,
  });
  return {
    ...response.data,
  } as IBlog;
}

async function editBlogProfileRequest(
  axios: AxiosInstance,
  blogProfileRequest: IBlogProfileRequest
) {
  const response = await axios({
    method: 'put',
    url: '/blog/edit',
    data: objectToFormData(blogProfileRequest),
  });
  return response.data;
}

export {
  getBlogByNameRequest,
  getBlogByIdRequest,
  followBlogRequest,
  getBlogLikesRequest,
  getFollowersRequest,
  getFollowingRequest,
  getCurrentBlogRequest,
  editBlogProfileRequest,
};

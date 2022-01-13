import { AxiosInstance } from 'axios';
import { IPostRequest } from '../../Types/requestTypes/IPostRequest';
import { IPostSearchForm } from '../../Types/requestTypes/IPostSearchRequest';
import IPost from '../../Types/IPost';
import { IPage } from '../../Types/IPage';
import IFile from '../../Types/IFile';
import api from '../config/AxiosApiInstance';

async function getPostRequest(postId: string) {
  const response = await api({
    method: 'get',
    url: `/post/${postId}`,
  });
  return {
    ...response.data,
  } as IPost;
}

async function getPostsRequest(postSearchForm: IPostSearchForm) {
  const response = await api({
    method: 'get',
    url: '/post/',
    params: postSearchForm,
  });
  return {
    ...response.data,
  } as IPage<IPost>;
}

const createPostRequest = async (postData: IPostRequest) => {
  const convertJsonListToFormDataList = (input: string[]) => {
    return JSON.stringify(input)
      .replaceAll('"', '')
      .replaceAll('[', '')
      .replaceAll(']', '');
  };
  const formData = new FormData();
  formData.append('title', postData.title);
  formData.append(
    'postTags',
    convertJsonListToFormDataList(postData.tags.map((tag) => tag.name))
  );
  formData.append('content', postData.content);
  formData.append(
    'communityTaggingEnabled',
    JSON.stringify(postData.communityTaggingEnabled)
  );
  formData.append('sensitive', JSON.stringify(postData.sensitive));
  formData.append('published', JSON.stringify(postData.published));
  postData.files.forEach((file) => {
    formData.append('files', file);
  });

  const response = await api({
    method: 'post',
    url: '/post/create',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  });
  return response.data as IPost;
};

const updatePostRequest = async (postData: IPost) => {};

const deletePostRequest = async (id: string) => {
  const response = await api({
    method: 'delete',
    url: `/post/${id}`,
  });
  return {
    ...response.data,
  };
};

const likePostRequest = async (id: string, isLike: boolean) => {
  const response = await api({
    method: isLike ? 'post' : 'delete',
    url: `/post/${id}/like`,
  });
  return response.data;
};

export {
  getPostRequest,
  getPostsRequest,
  createPostRequest,
  updatePostRequest,
  deletePostRequest,
  likePostRequest,
};

import axios from 'axios';
import { IPostForm } from '../../modelTypes/formTypes/IPostForm';
import { IPostSearchForm } from '../../modelTypes/formTypes/IPostSearchForm';
import IPost from '../../modelTypes/IPost';

const getPostRequest = async (postId: string) => {
  const response = await axios({
    method: 'get',
    url: `/post/${postId}`,
  });
  return response.data as IPost;
};

const getPostsRequest = async (postSearchForm: IPostSearchForm) => {
  const response = await axios({
    method: 'get',
    url: '/post/',
    params: postSearchForm,
  });
  return response.data as IPost[];
};

const createPostRequest = async (postData: IPostForm) => {
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
    convertJsonListToFormDataList(postData.tags.map(tag => tag.name))
  );
  formData.append('content', postData.content);
  formData.append(
    'communityTaggingEnabled',
    JSON.stringify(postData.communityTaggingEnabled)
  );
  formData.append('sensitive', JSON.stringify(postData.sensitive));
  postData.files.forEach((file) => {
    formData.append('files', file);
  });

  const response = await axios({
    method: 'post',
    url: '/post/create',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: postData,
  });
  return response.data as IPost;
};

const updatePostRequest = async (postData: IPost) => { };

const deletePostRequest = async (idToDelete: string) => { };

export {
  getPostRequest,
  getPostsRequest,
  createPostRequest,
  updatePostRequest,
  deletePostRequest,
};

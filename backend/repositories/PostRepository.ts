import { AxiosInstance } from 'axios';
import { IPostRequest } from '../../Types/requestTypes/IPostRequest';
import { IPostSearchForm } from '../../Types/requestTypes/IPostSearchRequest';
import IPost from '../../Types/IPost';
import { IPage } from '../../Types/IPage';

async function getPostRequest(axios: AxiosInstance, postId: string) {
  const response = await axios({
    method: 'get',
    url: `/post/${postId}`,
  });
  return {
    ...response.data,
  } as IPost;
}

async function getPostsRequest(
  axios: AxiosInstance,
  postSearchForm: IPostSearchForm
) {
  const response = await axios({
    method: 'get',
    url: '/post/',
    params: postSearchForm,
  });
  return {
    ...response.data,
  } as IPage<IPost>;
}

const createPostRequest = async (
  axios: AxiosInstance,
  postData: IPostRequest
) => {
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
    convertJsonListToFormDataList(postData.postTags.map((tag) => tag.name))
  );
  formData.append('content', postData.content);
  formData.append(
    'communityTaggingEnabled',
    JSON.stringify(postData.communityTaggingEnabled)
  );
  formData.append('sensitive', JSON.stringify(postData.sensitive));
  formData.append('published', JSON.stringify(postData.published));
  if (postData.parentPostId) {
    formData.append('parentPostId', postData.parentPostId);
  }
  postData.files.reverse().forEach((file) => {
    formData.append('files', file);
  });

  const response = await axios({
    method: 'post',
    url: '/post/create',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  });
  return response.data as IPost;
};

const updatePostRequest = async (
  axios: AxiosInstance,
  postData: IPostRequest
) => {
  const convertJsonListToFormDataList = (input: string[]) => {
    return JSON.stringify(input)
      .replaceAll('"', '')
      .replaceAll('[', '')
      .replaceAll(']', '');
  };
  const formData = new FormData();
  formData.append('id', postData.id);
  formData.append('title', postData.title);
  formData.append(
    'postTags',
    convertJsonListToFormDataList(postData.postTags.map((tag) => tag.name))
  );
  formData.append('content', postData.content);
  formData.append(
    'communityTaggingEnabled',
    JSON.stringify(postData.communityTaggingEnabled)
  );
  formData.append('sensitive', JSON.stringify(postData.sensitive));
  formData.append('published', JSON.stringify(postData.published));
  formData.append(
    'attachments',
    convertJsonListToFormDataList(
      postData.attachments?.reverse().map((it) => it.id) || []
    )
  );
  formData.append(
    'attachmentInsertions',
    convertJsonListToFormDataList(
      postData.attachmentInsertions.map((it) => it.toString())
    )
  );
  postData.files.reverse().forEach((file) => {
    formData.append('files', file);
  });

  const response = await axios({
    method: 'put',
    url: '/post/update',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  });
  return response.data as IPost;
};

const deletePostRequest = async (axios: AxiosInstance, id: string) => {
  const response = await axios({
    method: 'delete',
    url: `/post/${id}`,
  });
  return {
    ...response.data,
  };
};

const likePostRequest = async (
  axios: AxiosInstance,
  id: string,
  isLike: boolean
) => {
  const response = await axios({
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

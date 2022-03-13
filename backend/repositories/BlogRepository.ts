import { AxiosInstance } from 'axios';
import IBlog from '../../Types/IBlog';

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

async function followBlog(axios: AxiosInstance, id: string) {
  return axios({
    method: 'put',
    url: `/blog/${id}`,
  }).then((response) => {
    console.log(response);
  });
}

export { getBlogByNameRequest, getBlogByIdRequest };

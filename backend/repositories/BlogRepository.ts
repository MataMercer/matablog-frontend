import IBlog from '../../Types/IBlog';
import api from '../config/AxiosApiInstance';

async function getBlogByNameRequest(blogName: String) {
  const response = await api({
    method: 'get',
    url: `/blog/name/${blogName}`,
  });
  return {
    ...response.data,
  } as IBlog;
}
async function getBlogByIdRequest(id: String) {
  const response = await api({
    method: 'get',
    url: `/blog/${id}`,
  });
  return {
    ...response.data,
  } as IBlog;
}

async function followBlog(id: string) {
  return api({
    method: 'put',
    url: `/blog/${id}`,
  }).then((response) => {
    console.log(response);
  });
}

export { getBlogByNameRequest, getBlogByIdRequest };

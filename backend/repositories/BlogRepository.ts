import axios from "axios";
import IBlog from "../../Types/IBlog";


async function getBlogByNameRequest(blogName: String) {
  const response = await axios({
    method: 'get',
    url: `/blog/name/${blogName}`,
  });
  return {
    ...response.data,
  } as IBlog;
}
async function getBlogByIdRequest(id: String) {
  const response = await axios({
    method: 'get',
    url: `/blog/${id}`,
  });
  return {
    ...response.data,
  } as IBlog;
}

async function followBlog(id: string) {
  return axios({
    method: 'put',
    url: `/blog/${id}`,
  }).then((response) => {
    console.log(response);


  });
}

export { getBlogByNameRequest, getBlogByIdRequest }
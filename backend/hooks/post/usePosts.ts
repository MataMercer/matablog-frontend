import { ApiError } from 'next/dist/server/api-utils';
import { useQuery } from 'react-query';
import { IGetPostsForm } from '../../../Types/requestTypes/IGetPostsRequest';
import { IPage } from '../../../Types/IPage';
import IPost from '../../../Types/IPost';
import { getPostsRequest } from '../../repositories/PostRepository';
import { useAxios } from '../../../auth/AxiosProvider';

type UsePostsProps = {
  getPostsForm: IGetPostsForm;
};

function usePosts({ getPostsForm }: UsePostsProps) {
  const axios = useAxios();
  return useQuery<IPage<IPost>, ApiError>(['posts', getPostsForm], () =>
    getPostsRequest(axios, {
      page: getPostsForm.page,
      category: getPostsForm.category,
      blogNames: getPostsForm.blogNames,
      following: getPostsForm.following,
    })
  );
}

export default usePosts;

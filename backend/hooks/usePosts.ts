import { useEffect, useState } from 'react';
import { IPostSearchForm } from '../../Types/requestTypes/IPostSearchRequest';
import { IPage } from '../../Types/IPage';
import IPost from '../../Types/IPost';
import { getPostsRequest } from '../repositories/PostRepository';
import useGenericRequest from './util/useGenericRequest';

type UsePostsProps = {
  initialLoad?: boolean;
  postSearchForm: IPostSearchForm;
};

function usePosts({ initialLoad, postSearchForm }: UsePostsProps) {
  const { callRequest, data, status, errors } =
    useGenericRequest<IPage<IPost>>();
  const [postsPage, setPostsPage] = useState<IPage<IPost>>();
  useEffect(() => {
    if (initialLoad) {
      callRequest(
        getPostsRequest({
          page: postSearchForm.page,
          category: postSearchForm.category,
          blogName: postSearchForm.blogName,
        })
      );
    }
  }, [
    initialLoad,
    callRequest,
    postSearchForm.page,
    postSearchForm.category,
    postSearchForm.blogName,
  ]);

  useEffect(() => {
    if (status === 'succeeded' && data) {
      setPostsPage(data);
    }
  }, [data, status]);

  return {
    postsPage,
    status,
    errors,
  };
}

export default usePosts;

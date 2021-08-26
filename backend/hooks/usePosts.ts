import { useEffect } from 'react';
import { useState } from 'react';
import { IPostSearchForm } from '../../modelTypes/formTypes/IPostSearchForm';
import { IPage, Pageable } from '../../modelTypes/IPage';
import IPost from '../../modelTypes/IPost';
import { getPostsRequest } from '../repositories/PostRepository';
import useGenericRequest from './util/useGenericRequest';

type UsePostsProps = {
  initialLoad?: boolean;
  postSearchForm: IPostSearchForm;
};

function usePosts({ initialLoad, postSearchForm }: UsePostsProps) {
  const { status, errors, callRequest, data } = useGenericRequest<IPage<IPost>>();
  const [postsPage, setPostsPage] = useState<IPage<IPost>>();
  useEffect(() => {
    if (initialLoad) {
      callRequest(getPostsRequest(postSearchForm));
    }
  }, [postSearchForm.page, initialLoad]);

  useEffect(() => {
    if (status === 'succeeded' && data) {
      setPostsPage(data);
    }
  }, [data]);

  return {
    postsPage,
    status,
    errors,
  };
}

export default usePosts;

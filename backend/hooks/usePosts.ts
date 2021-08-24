import { useEffect } from 'react';
import { useState } from 'react';
import { IPostSearchForm } from '../../modelTypes/formTypes/IPostSearchForm';
import IPost from '../../modelTypes/IPost';
import { getPostsRequest } from '../repositories/PostRepository';
import useGenericRequest from './util/useGenericRequest';

type UsePostsProps = {
  initialLoad?: boolean;
  postSearchForm: IPostSearchForm;
};

function usePosts({ initialLoad, postSearchForm }: UsePostsProps) {
  const { status, errors, callRequest, data } = useGenericRequest();
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    if (initialLoad) {
      callRequest(getPostsRequest(postSearchForm));
    }
  }, []);

  useEffect(() => {
    if (status === 'succeeded') {
      setPosts(data);
    }
  }, [data]);

  return {
    posts,
    status,
    errors,
  };
}

export default usePosts;

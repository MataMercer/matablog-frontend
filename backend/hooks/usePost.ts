import { useEffect, useState } from 'react';
import { IPostSearchForm } from '../../Types/requestTypes/IPostSearchRequest';
import IPost from '../../Types/IPost';
import { getPostRequest } from '../repositories/PostRepository';
import useGenericRequest from './util/useGenericRequest';

type UsePostProps = {
  initialLoad?: boolean;
  postId?: string;
};

function usePost({ initialLoad, postId }: UsePostProps) {
  const { status, errors, callRequest, data } = useGenericRequest<IPost>();
  const [post, setPost] = useState<IPost>();

  useEffect(() => {
    if (initialLoad && postId) {
      callRequest(getPostRequest(postId));
    }
  }, [postId]);

  useEffect(() => {
    if (status === 'succeeded') {
      setPost(data);
    }
  }, [data])

  return { post, status, errors };
}

export default usePost;

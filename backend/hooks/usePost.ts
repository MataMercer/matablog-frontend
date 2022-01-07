import { useCallback, useEffect, useState } from 'react';
import { IPostSearchForm } from '../../Types/requestTypes/IPostSearchRequest';
import IPost from '../../Types/IPost';
import { getPostRequest } from '../repositories/PostRepository';
import useGenericRequest from './util/useGenericRequest';

type UsePostProps = {
  initialLoad?: boolean;
  postId?: string;
};

function usePost({ initialLoad, postId }: UsePostProps) {
  const { callRequest, data, status, errors } = useGenericRequest<IPost>();
  const [post, setPost] = useState<IPost>();

  useEffect(() => {
    if (initialLoad && postId) {
      callRequest(getPostRequest(postId));
    }
  }, [initialLoad, callRequest, postId]);

  useEffect(() => {
    if (status === 'succeeded') {
      setPost(data);
    }
  }, [data, status]);

  const fetchPost = useCallback(() => {
    if (postId) {
      callRequest(getPostRequest(postId));
    }
  }, [callRequest, postId]);

  return { post, fetchPost, status, errors };
}

export default usePost;

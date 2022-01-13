import { useQuery } from 'react-query';
import IPost from '../../Types/IPost';
import { getPostRequest } from '../repositories/PostRepository';
import { ApiError } from '../../Types/IApiError';

type UsePostProps = {
  postId: string;
};

function usePost({ postId }: UsePostProps) {
  return useQuery<IPost, ApiError>(['post', postId], () =>
    getPostRequest(postId)
  );
}

export default usePost;

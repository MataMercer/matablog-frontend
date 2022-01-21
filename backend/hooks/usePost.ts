import { useQuery, UseQueryOptions } from 'react-query';
import IPost from '../../Types/IPost';
import { getPostRequest } from '../repositories/PostRepository';
import { ApiError } from '../../Types/IApiError';

type UsePostProps = {
  postId: string;
  enabled?: boolean;
};

function usePost({ postId, enabled }: UsePostProps) {
  return useQuery<IPost, ApiError>(
    ['post', postId],
    () => getPostRequest(postId),
    { enabled: enabled === undefined ? true : enabled }
  );
}
export default usePost;

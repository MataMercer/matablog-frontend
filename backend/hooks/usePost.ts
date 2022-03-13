import { useQuery, UseQueryOptions } from 'react-query';
import IPost from '../../Types/IPost';
import { getPostRequest } from '../repositories/PostRepository';
import { ApiError } from '../../Types/IApiError';
import { useAxios } from '../../auth/AxiosProvider';

type UsePostProps = {
  postId: string;
  enabled?: boolean;
};

function usePost({ postId, enabled }: UsePostProps) {
  const axios = useAxios();
  return useQuery<IPost, ApiError>(
    ['post', postId],
    () => getPostRequest(axios, postId),
    { enabled: enabled === undefined ? true : enabled }
  );
}
export default usePost;

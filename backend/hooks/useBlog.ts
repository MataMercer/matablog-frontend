import { useQuery } from 'react-query';
import { useAxios } from '../../auth/AxiosProvider';
import { ApiError } from '../../Types/IApiError';
import IBlog from '../../Types/IBlog';
import { getBlogByIdRequest } from '../repositories/BlogRepository';

type UseBlogProps = {
  blogId: string;
  enabled?: boolean;
};

function useBlog({ blogId, enabled }: UseBlogProps) {
  const axios = useAxios();
  return useQuery<IBlog, ApiError>(
    ['blog', blogId],
    () => getBlogByIdRequest(axios, blogId),
    { enabled: enabled || true }
  );
}

export default useBlog;

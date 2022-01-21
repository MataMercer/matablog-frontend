import { useQuery } from 'react-query';
import { ApiError } from '../../Types/IApiError';
import IBlog from '../../Types/IBlog';
import { getBlogByIdRequest } from '../repositories/BlogRepository';

type UseBlogProps = {
  blogId: string;
  enabled?: boolean;
};

function useBlog({ blogId, enabled }: UseBlogProps) {
  return useQuery<IBlog, ApiError>(
    ['blog', blogId],
    () => getBlogByIdRequest(blogId),
    { enabled: enabled || true }
  );
}

export default useBlog;

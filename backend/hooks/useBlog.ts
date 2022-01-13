import { useQuery } from 'react-query';
import { ApiError } from '../../Types/IApiError';
import IBlog from '../../Types/IBlog';
import { getBlogByIdRequest } from '../repositories/BlogRepository';

type UseBlogProps = {
  blogId: string;
};

function useBlog({ blogId }: UseBlogProps) {
  return useQuery<IBlog, ApiError>(['blog', blogId], () =>
    getBlogByIdRequest(blogId)
  );
}

export default useBlog;

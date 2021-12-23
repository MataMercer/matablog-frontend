import { useEffect, useState } from 'react';
import IBlog from '../../Types/IBlog';
import useGenericRequest from './util/useGenericRequest';
import { getBlogByIdRequest, getBlogByNameRequest } from '../repositories/BlogRepository';

type UseBlogProps = {
  initialLoad?: boolean;
  blogId?: string;
  blogName?: string;
};

function useBlog({ initialLoad, blogId, blogName }: UseBlogProps) {
  const { status, errors, callRequest, data } = useGenericRequest<IBlog>();
  const [blog, setBlog] = useState<IBlog>();

  useEffect(() => {
    if (initialLoad) {
      if (blogId) {
        callRequest(getBlogByIdRequest(blogId));
      }
      if (blogName) {
        callRequest(getBlogByNameRequest(blogName));
      }
    }
  }, [blogId, blogName]);

  useEffect(() => {
    if (status === 'succeeded') {
      setBlog(data);
    }
  }, [data])

  return { blog, status, errors };
}

export default useBlog;


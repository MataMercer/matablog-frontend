import { useEffect, useState } from 'react';
import IBlog from '../../Types/IBlog';
import useGenericRequest from './util/useGenericRequest';
import {
  getBlogByIdRequest,
  getBlogByNameRequest,
} from '../repositories/BlogRepository';

type UseBlogProps = {
  initialLoad?: boolean;
  blogId?: string;
  blogName?: string;
};

function useBlog({ initialLoad, blogId, blogName }: UseBlogProps) {
  const { callRequest, data, status, errors } = useGenericRequest<IBlog>();
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
  }, [blogId, blogName, callRequest, initialLoad]);

  useEffect(() => {
    if (status === 'succeeded') {
      setBlog(data);
    }
  }, [data, status]);

  return { blog, status, errors };
}

export default useBlog;

import { useQuery } from 'react-query';
import { useAxios } from '../../../auth/AxiosProvider';
import { ApiError } from '../../../Types/IApiError';
import ILike from '../../../Types/ILike';
import { IPage } from '../../../Types/IPage';
import { getBlogLikesRequest } from '../../repositories/BlogRepository';

type UseLikesProps = {
  blogId: string;
  enabled?: boolean;
};

export default function useLikes({ blogId, enabled }: UseLikesProps) {
  const axios = useAxios();
  return useQuery<IPage<ILike>, ApiError>(
    ['likes', blogId],
    () => getBlogLikesRequest(axios, blogId),
    { enabled: enabled === undefined ? true : enabled }
  );
}

import { useQuery } from 'react-query';
import { useAxios } from '../../../auth/AxiosProvider';
import { ApiError } from '../../../Types/IApiError';
import IFollow from '../../../Types/IFollow';
import { IPage } from '../../../Types/IPage';
import { IPageRequest } from '../../../Types/requestTypes/IPageRequest';
import { getFollowersRequest } from '../../repositories/BlogRepository';

type UseFollowersProps = {
  blogId: string;
  pageRequest: IPageRequest;
  enabled?: boolean;
};

export default function useFollowers({
  blogId,
  pageRequest,
  enabled,
}: UseFollowersProps) {
  const axios = useAxios();
  return useQuery<IPage<IFollow>, ApiError>(
    ['followers', blogId],
    () => getFollowersRequest(axios, blogId, pageRequest),
    { enabled: enabled === undefined ? true : enabled }
  );
}

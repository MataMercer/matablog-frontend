import { useQuery } from 'react-query';
import { useAxios } from '../../../auth/AxiosProvider';
import { ApiError } from '../../../Types/IApiError';
import IFollow from '../../../Types/IFollow';
import { IPage } from '../../../Types/IPage';
import { IPageRequest } from '../../../Types/requestTypes/IPageRequest';
import { getFollowingRequest } from '../../repositories/BlogRepository';

type UseFollowingsProps = {
  blogId: string;
  pageRequest: IPageRequest;
  enabled?: boolean;
};

export default function useFollowings({
  blogId,
  pageRequest,
  enabled,
}: UseFollowingsProps) {
  const axios = useAxios();
  return useQuery<IPage<IFollow>, ApiError>(
    ['followings', blogId],
    () => getFollowingRequest(axios, blogId, pageRequest),
    { enabled: enabled === undefined ? true : enabled }
  );
}

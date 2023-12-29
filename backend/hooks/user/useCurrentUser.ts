import { ApiError } from 'next/dist/server/api-utils';
import { useQuery } from 'react-query';
import { useAxios } from '../../../auth/AxiosProvider';
import IUser from '../../../Types/IUser';
import { getCurrentUserRequest } from '../../repositories/UserRepository';

export default function useCurrentUser() {
  const axios = useAxios();
  return useQuery<IUser, ApiError>(['currentUser'], () =>
    getCurrentUserRequest(axios)
  );
}

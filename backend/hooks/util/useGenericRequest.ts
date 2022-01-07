import { useCallback, useState } from 'react';
import { ApiError } from '../../../Types/IApiError';
import { RequestStatus } from '../../../Types/enums/RequestStatus';

function useGenericRequest<T>() {
  const [data, setData] = useState<T>();
  const [status, setStatus] = useState<RequestStatus>('idle');
  const [errors, setErrors] = useState<ApiError[]>([]);

  const callRequest = useCallback(
    async (request: Promise<any>) => {
      console.log('sending request...');
      setStatus('loading');
      try {
        const res = await request;
        console.log('request success!');
        setStatus('succeeded');
        setErrors([]);
        setData(res);
      } catch (err: any) {
        setErrors([err]);
        setStatus('error');
        setData(undefined);
      }
    },
    []
  );

  return { callRequest, data, status, errors };
}
export default useGenericRequest;

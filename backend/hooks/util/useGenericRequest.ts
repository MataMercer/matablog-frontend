import { useCallback, useState } from 'react';
import { ApiError } from '../../../Types/IApiError';
import { RequestStatus } from '../../../Types/enums/RequestStatus';

function useGenericRequest<T>() {
  const [data, setData] = useState<T>();
  const [status, setStatus] = useState<RequestStatus>('idle');
  const [errors, setErrors] = useState<ApiError[]>([]);

  const callRequest = useCallback(
    async (request: Promise<any>) => {
      setStatus('loading');
      try {
        const res = await request;
        setStatus('succeeded');
        setErrors([]);
        setData(res);
      } catch (err: any) {
        setErrors([...errors, err]);
        setStatus('error');
        setData(undefined);
      }
    },
    [errors]
  );

  return { status, errors, callRequest, data };
}
export default useGenericRequest;

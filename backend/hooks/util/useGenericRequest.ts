import { useCallback, useState } from 'react';
import { ApiError } from '../../../modelTypes/IApiError';
import { RequestStatus } from '../../../modelTypes/enums/RequestStatus';

function useGenericRequest() {
  const [data, setData] = useState<any>();
  const [status, setStatus] = useState<RequestStatus>('idle');
  const [errors, setErrors] = useState<ApiError[]>([]);

  const callRequest = useCallback(
    async (request: Promise<any>) => {
      setStatus('loading');
      console.log('calling request...');
      try {
        const res = await request;
        setStatus('succeeded');
        setData(res);
        console.log('success');
      } catch (err) {
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

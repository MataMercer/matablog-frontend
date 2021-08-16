import { useCallback, useState } from 'react';
import { ApiError } from '../../../modelTypes/ApiError';
import { RequestStatus } from '../../../modelTypes/RequestStatus';

function useGenericRequest(request: (args: any) => Promise<any>) {
  const [res, setRes] = useState<any>();
  const [status, setStatus] = useState<RequestStatus>('idle');
  const [errors, setErrors] = useState<ApiError[]>([]);

  const callRequest = useCallback(
    async (input: typeof args) => {
      setStatus('loading');
      console.log('calling request...');
      try {
        const res = await request();
        setStatus('succeeded');
        setRes(res);
        console.log('success');
      } catch (err) {
        setErrors([...errors, err]);
        setStatus('error');
      }
    },
    [errors]
  );

  return { status, errors, callRequest, res };
}
export default useGenericRequest;

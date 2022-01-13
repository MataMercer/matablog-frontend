/* eslint-disable react/jsx-no-useless-fragment */
import { Alert } from 'react-bootstrap';
import { ApiError } from '../Types/IApiError';

type ErrorAlertProps = {
  errors: ApiError[];
};

export default function ErrorAlert({ errors }: ErrorAlertProps) {
  return (
    <>
      {errors.length > 0
        ? errors.map((err, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Alert key={index} variant="danger">
              {`Error: ${err.message}`}
            </Alert>
          ))
        : null}
    </>
  );
}

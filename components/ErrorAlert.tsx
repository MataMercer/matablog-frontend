import { Alert } from 'react-bootstrap';
import { ApiError } from '../modelTypes/IApiError';
type ErrorAlertProps = {
  errors: ApiError[];
};

const ErrorAlert = ({ errors }: ErrorAlertProps) => {
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
};

export default ErrorAlert;

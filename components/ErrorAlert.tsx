/* eslint-disable react/jsx-no-useless-fragment */
import { Alert } from 'react-bootstrap';
import { ApiError } from '../Types/IApiError';

type ErrorAlertProps = {
  error?: ApiError | null;
};

export default function ErrorAlert({ error }: ErrorAlertProps) {
  if (!error) {
    return null;
  }
  return <Alert variant="danger">{`Error: ${error.message}`}</Alert>;
}

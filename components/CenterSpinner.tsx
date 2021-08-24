import React from 'react';
import { Spinner } from 'react-bootstrap';
import { RequestStatus } from '../modelTypes/enums/RequestStatus';

type CenterSpinnerProps = {
  status: RequestStatus;
};
export default function CenterSpinner({ status }: CenterSpinnerProps) {
  return (
    <div className="center-spinner">
      {status === 'loading' ? <Spinner animation="border" /> : null}
    </div>
  );
}

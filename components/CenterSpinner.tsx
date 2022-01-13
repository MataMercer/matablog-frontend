import React from 'react';
import { Spinner } from 'react-bootstrap';
import { QueryStatus } from 'react-query';

type CenterSpinnerProps = {
  status: QueryStatus;
};
export default function CenterSpinner({ status }: CenterSpinnerProps) {
  return (
    <div className="center-spinner">
      {status === 'loading' && <Spinner animation="border" />}
    </div>
  );
}

import React from 'react';
// eslint-disable-next-line no-unused-vars
import { useForm } from 'react-hook-form';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../../auth/AuthContext';
import ErrorAlert from '../ErrorAlert';
import { ILoginRequest } from '../../Types/requestTypes/ILoginRequest';
import Link from 'next/link';
import { url } from 'inspector';

export default function LoginForm() {
  const { login, loginError } = useAuth();
  const { register, setValue, handleSubmit, watch } = useForm<ILoginRequest>({
    criteriaMode: 'all',
  });
  const onSubmit = handleSubmit((data) => {
    login(data);
  });

  return (
    <Form onSubmit={onSubmit}>
      <ErrorAlert error={loginError} />
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control
          {...register('username', { required: 'You must enter a username.' })}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          {...register('password', { required: 'You must enter a password.' })}
        />
      </Form.Group>
      <Button color="primary" type="submit">
        Login
      </Button>

      <Link
        href={{
          pathname: 'http://localhost:8080/api/v1/oauth/github/login',
        }}
      >
        <Button>Github Login</Button>
      </Link>
    </Form>
  );
}

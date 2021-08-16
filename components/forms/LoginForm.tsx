import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { useAuth } from '../../auth/AuthContext';
import ErrorAlert from '../ErrorAlert';
import { useForm } from 'react-hook-form';
import { Button, Form } from 'react-bootstrap';
import { ILoginForm } from '../../modelTypes/formTypes/loginForm';

export default function LoginForm() {
  const { login, loginError } = useAuth();
  const { register, setValue, handleSubmit, watch } = useForm<ILoginForm>({
    criteriaMode: 'all',
  });
  const onSubmit = handleSubmit((data) => {
    login(data);
  });

  return (
    <Form onSubmit={onSubmit}>
      <ErrorAlert errors={loginError ? [loginError] : []} />
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
    </Form>
  );
}

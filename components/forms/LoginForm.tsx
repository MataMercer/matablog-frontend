import React from 'react';
// eslint-disable-next-line no-unused-vars
import { useForm } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import { useAuth } from '../../auth/AuthContext';
import ErrorAlert from '../ErrorAlert';
import { ILoginRequest } from '../../Types/requestTypes/ILoginRequest';
import Link from 'next/link';
import { url } from 'inspector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Button } from '../ui/Button';
import AxiosApiConfig from '../../backend/config/AxiosApiConfig';

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
      <Button type="submit">Login</Button>

      <Link href={`${AxiosApiConfig.baseURL}oauth/github/login`}>
        <Button color="dark">
          <FontAwesomeIcon icon={faGithub} /> Github Login
        </Button>
      </Link>
      <Link href={`${AxiosApiConfig.baseURL}oauth/google/login`}>
        <Button color="light">
          <FontAwesomeIcon icon={faGoogle} /> Google Login
        </Button>
      </Link>
    </Form>
  );
}

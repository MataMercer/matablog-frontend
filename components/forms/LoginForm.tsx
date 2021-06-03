import React, { useState } from 'react';
import { Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap';
// eslint-disable-next-line no-unused-vars
import { useAuth } from '../../auth/auth';
import ErrorAlert from '../ErrorAlert';
import { useForm } from 'react-hook-form';

type FormData = {
  username: string;
  password: string;
};

export default function LoginForm() {
  const { login } = useAuth();
  const [error, setError] = useState<string>();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { register, setValue, handleSubmit, watch } = useForm<FormData>({
    criteriaMode: 'all',
  });
  const onSubmit = handleSubmit((data) => {
    login(data.username, data.password).catch((loginError) => {
      setError(loginError);
    });
  });

  return (
    <Form onSubmit={onSubmit}>
      <ErrorAlert errors={error ? [error] : []} />
      <FormGroup>
        <Label for="username">Username</Label>
        <Input
          {...register('username', { required: 'You must enter a username.' })}
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleText">Password</Label>
        <Input
          type="password"
          {...register('password', { required: 'You must enter a password.' })}
        />
      </FormGroup>
      <Button color="primary" type="submit">
        Login
      </Button>
    </Form>
  );
}

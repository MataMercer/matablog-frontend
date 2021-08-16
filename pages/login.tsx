import Layout from '../components/Layout';
import LoginForm from '../components/forms/LoginForm';
import UnauthRoute from '../auth/UnauthRoute';

function Login() {
  return (
    <div>
      <Layout title="Login">
        <h1 className="title">Login</h1>
        <p>Welcome back to Matablog.</p>
        <LoginForm />
      </Layout>
    </div>
  );
}

export default UnauthRoute(Login);

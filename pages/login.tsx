import Layout from '../components/Layout';
import LoginForm from '../components/forms/LoginForm';

export default function Login() {
  return (
    <div>
      <Layout title="Login">
        <h1 className="title">Login</h1>
        <p>Welcome back to Fortree blog.</p>
        <LoginForm />
      </Layout>
    </div>
  );
}

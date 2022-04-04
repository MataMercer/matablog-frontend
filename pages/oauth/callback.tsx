import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../../auth/AuthContext';
import ErrorAlert from '../../components/ErrorAlert';
import Layout from '../../components/Layout';

export default function Callback() {
  const router = useRouter();
  const { code } = router.query;
  const { oauthLogin, loginError } = useAuth();
  useEffect(() => {
    if (code) oauthLogin(code as String);
  }, [code]);

  return (
    <Layout title="Logging in...">
      <ErrorAlert error={loginError} />
      <h1>Logging in...</h1>
      <p>Logging in with Github. You will be redirected shortly...</p>
    </Layout>
  );
}

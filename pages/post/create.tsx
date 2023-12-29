import Router from 'next/router';
import dynamic from 'next/dynamic';
import ProtectRoute from '../../auth/ProtectRoute';
import Layout from '../../components/Layout';

const NoSSR = dynamic(() => import('../../components/forms/PostForm'), {
  ssr: false,
});
function PostFormPage() {
  return (
    <div>
      <Layout title="New Post">
        <h1>Create a New Post</h1>
        <NoSSR
          postId=""
          onSuccess={() => {
            Router.push('/');
          }}
        />
      </Layout>
    </div>
  );
}

export default ProtectRoute(PostFormPage);

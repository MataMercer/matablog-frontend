import ProtectRoute from '../auth/ProtectRoute';
import PostForm from '../components/forms/PostForm';
import Layout from '../components/Layout';

function PostFormPage() {
  return (
    <div>
      <Layout title="New Post">
        <h1>Create a New Post</h1>
        <PostForm postId="" />
      </Layout>
    </div>
  );
}

export default ProtectRoute(PostFormPage);

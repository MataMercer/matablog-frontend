import Router, { useRouter } from 'next/router';
import PostForm from '../../../components/forms/PostForm';
import Layout from '../../../components/Layout';

export default function PostUpdatePage() {
  const router = useRouter();
  const { postid } = router.query;

  return (
    <Layout title="Update Post">
      <h1>Edit a Post</h1>
      <PostForm
        postId={postid as string}
        onSuccess={() => {
          Router.push('/');
        }}
      />
    </Layout>
  );
}

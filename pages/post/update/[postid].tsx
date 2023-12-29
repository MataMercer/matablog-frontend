import Router, { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Layout from '../../../components/Layout';

const NoSSR = dynamic(() => import('../../../components/forms/PostForm'), {
  ssr: false,
});
export default function PostUpdatePage() {
  const router = useRouter();
  const { postid } = router.query;

  return (
    <Layout title="Update Post">
      <h1>Edit a Post</h1>
      <NoSSR
        postId={postid as string}
        onSuccess={() => {
          Router.push(`/post/${postid}`);
        }}
      />
    </Layout>
  );
}

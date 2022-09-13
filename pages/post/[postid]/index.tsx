import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../../../components/Layout';
import PostDisplay from '../../../components/PostDisplay/PostDisplay';

export default function PostPage() {
  const router = useRouter();
  const { postid } = router.query;

  const [title, setTitle] = useState<string>('Post');
  return (
    <Layout title={title}>
      <PostDisplay postId={postid as string} setPageTitle={setTitle} />
    </Layout>
  );
}

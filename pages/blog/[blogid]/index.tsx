import { useRouter } from 'next/router';
import { useState } from 'react';
import BlogProfile from '../../../components/blog/BlogProfile';
import Layout from '../../../components/Layout';

export default function UserProfilePage() {
  const router = useRouter();
  const { blogid } = router.query;

  const [title, setTitle] = useState<string>('Blog Profile');
  return (
    <Layout title={title}>
      <BlogProfile blogId={blogid as string} setPageTitle={setTitle} />
    </Layout>
  );
}

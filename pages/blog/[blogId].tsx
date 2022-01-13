import { useRouter } from 'next/router';
import { useState } from 'react';
import BlogProfile from '../../components/BlogProfile';
import Layout from '../../components/Layout';

export default function UserProfilePage() {
  const router = useRouter();
  const { blogId } = router.query;

  const [title, setTitle] = useState<string>('Blog Profile');
  return (
    <Layout title={title}>
      <BlogProfile blogName={blogId as string} />
    </Layout>
  );
}

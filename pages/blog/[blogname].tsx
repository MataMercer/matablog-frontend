import { useRouter } from 'next/router';
import { useState } from 'react';
import BlogProfile from '../../components/BlogProfile';
import Layout from '../../components/Layout';

const UserProfilePage = () => {
  const router = useRouter();
  const { blogname } = router.query;

  const [title, setTitle] = useState<string>('Blog Profile');
  return (
    <Layout title={title}>
      <BlogProfile blogName={blogname as string} />
    </Layout>
  );
};

export default UserProfilePage;

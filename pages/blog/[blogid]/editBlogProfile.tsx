import { useRouter } from 'next/router';
import { useState } from 'react';
import BlogProfile from '../../../components/blog/BlogProfile';
import EditBlogProfileForm from '../../../components/forms/EditBlogProfileForm';
import Layout from '../../../components/Layout';

export default function editBlogProfile() {
  const router = useRouter();
  const { blogid } = router.query;

  const [title, setTitle] = useState<string>('Edit Blog Profile');
  return (
    <Layout title={title}>
      <EditBlogProfileForm />
    </Layout>
  );
}

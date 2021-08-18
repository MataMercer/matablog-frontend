import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../../components/Layout';
import ProjectEntry from '../../components/ProjectEntry';

const UserProfilePage = () => {
  const router = useRouter();
  const { userId } = router.query;

  const [title, setTitle] = useState<string>('User Profile');
  return (
    <Layout title={title}>
      <ProjectEntry userId={userId as string} setPageTitle={setTitle} />
    </Layout>
  );
};

export default UserProfilePage;

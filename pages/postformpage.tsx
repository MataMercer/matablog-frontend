import ProtectRoute from '../auth/ProtectRoute';
import Layout from '../components/Layout';
import ProjectEntryForm from '../components/forms/ProjectEntryForm';

function ProjectEntryFormPage() {
  return (
    <div>
      <Layout title="New Post">
        <h1>Create a New Post</h1>
      </Layout>
    </div>
  );
}

export default ProtectRoute(ProjectEntryFormPage);

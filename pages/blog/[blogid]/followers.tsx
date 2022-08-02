import { useRouter } from 'next/router';
import { useState } from 'react';
import useFollowers from '../../../backend/hooks/blog/useFollowers';
import BlogHandle from '../../../components/blog/BlogHandle';
import BlogThumbnail from '../../../components/blog/BlogThumbnail';
import Layout from '../../../components/Layout';

export default function FollowersPage() {
  const router = useRouter();
  const params = router.query;

  const page =
    params && params.page ? parseInt(params.page as string, 10) - 1 : 0;

  const { blogid } = params;

  const { data, status, error } = useFollowers({
    blogId: blogid as string,
    pageRequest: { page, pageSize: 20 },
    enabled: true,
  });

  const [title, setTitle] = useState<string>('Blog Followers');
  const followers = data?.content;
  return (
    <Layout title={title}>
      <h1>Followers</h1>
      <p>Blogs that follow this blog.</p>
      {followers && followers.length > 0 ? (
        followers.map((follow) => <BlogHandle blog={follow.follower} />)
      ) : (
        <p>This blog does not have any followers yet.</p>
      )}
    </Layout>
  );
}

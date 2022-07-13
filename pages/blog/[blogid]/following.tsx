import { useRouter } from 'next/router';
import { useState } from 'react';
import useFollowings from '../../../backend/hooks/blog/useFollowings';
import BlogThumbnail from '../../../components/blog/BlogThumbnail';
import Layout from '../../../components/Layout';

export default function FollowingPage() {
  const router = useRouter();
  const params = router.query;

  const page =
    params && params.page ? parseInt(params.page as string, 10) - 1 : 0;

  const { blogid } = params;

  const { data, status, error } = useFollowings({
    blogId: blogid as string,
    pageRequest: { page, pageSize: 20 },
    enabled: true,
  });

  const [title, setTitle] = useState<string>('Blog Followers');
  const followers = data?.content;
  return (
    <Layout title={title}>
      <h1>Following</h1>
      {followers && followers.length > 0 ? (
        followers.map((follow) => <BlogThumbnail blog={follow.followee} />)
      ) : (
        <p>This blog is not following anyone yet.</p>
      )}
    </Layout>
  );
}

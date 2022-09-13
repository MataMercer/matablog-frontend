import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useBlog from '../../../backend/hooks/blog/useBlog';
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

  const {
    data: blog,
    status: blogStatus,
    error: blogError,
  } = useBlog({ blogId: blogid as string });

  const [title, setTitle] = useState<string>(`@${blog?.blogName}'s Followers`);
  const followers = data?.content;
  return (
    <Layout title={title}>
      <h1>@{blog?.blogName}'s Followers</h1>
      <p>
        Blogs that follow{' '}
        <Link href={`/blog/${blogid}`}>
          <a>@{blog?.blogName}</a>
        </Link>
        .
      </p>
      {followers && followers.length > 0 ? (
        followers.map((follow) => <BlogHandle blog={follow.follower} />)
      ) : (
        <p>This blog does not have any followers yet.</p>
      )}
    </Layout>
  );
}

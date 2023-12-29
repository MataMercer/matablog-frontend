import Link from 'next/link';
import { useEffect } from 'react';
import { useQueryClient } from 'react-query';
import styled from 'styled-components';
import { useAuth } from '../../auth/AuthContext';
import useBlog from '../../backend/hooks/blog/useBlog';
import CenterSpinner from '../CenterSpinner';
import ErrorAlert from '../ErrorAlert';
import FollowButton from '../FollowButton';
import PostCategoryTabs from '../PostCategoryTabs';
import { Button } from '../ui/Button';

const AvatarImage = styled.img`
  width: 7.5em;
`;

type BlogProfileProps = {
  blogId: string;
  setPageTitle: (pageTitle: string) => void;
};

const BlogProfileHeader = styled.div`
  display: flex;
  flex-flow: row;
`;

export default function BlogProfile({
  blogId,
  setPageTitle,
}: BlogProfileProps) {
  const {
    data: blog,
    error,
    status,
  } = useBlog({
    blogId,
  });

  const { user } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (status === 'success' && blog) {
      setPageTitle('blog');
    }
  }, [blog, setPageTitle, status]);
  return (
    <>
      <ErrorAlert error={error} />
      <CenterSpinner status={status} />
      {blog && (
        <div>
          <BlogProfileHeader>
            <div>
              <AvatarImage
                src={blog.blogProfile?.avatarUrl}
                alt="avatarImage"
              />
              <h1>{`${blog?.blogProfile?.preferredBlogName}`}</h1>
              <h2>{`@${blog.blogName}`}</h2>
            </div>
            {blog.id !== user?.activeBlog.id ? (
              <>
                <p>{blog.follower && !blog.following && 'Follows you'}</p>
                <p>{blog.follower && blog.following && 'Mutual Follower'}</p>
                <FollowButton
                  blogId={blog.id}
                  followed={!!blog.following}
                  onSuccess={() => {
                    queryClient.invalidateQueries(['blog', blog.id]);
                  }}
                />{' '}
              </>
            ) : (
              <Link href={`/blog/${blog.id}/editBlogProfile`}>
                <Button>Edit Profile</Button>
              </Link>
            )}


            <div>
              <Link
                href={`/blog/${blog.id}/followers`}
              >{`${blog.followerCount} Followers`}</Link>
            </div>
            <div>
              <Link
                href={`/blog/${blog.id}/following`}
              >{`${blog.followingCount} Following`}</Link>
            </div>
          </BlogProfileHeader>

          <PostCategoryTabs
            postSearchForm={{ blogNames: [blog.blogName as string] }}
          />
        </div>
      )}
    </>
  );
}

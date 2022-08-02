import Link from 'next/link';
import styled from 'styled-components';
import { getFileUrl } from '../../backend/repositories/FileRepository';
import IBlog from '../../Types/IBlog';

const AvatarImage = styled.img`
  height: 3em;
  margin-right: 0.5em;
`;

const AvatarWithTextWrapper = styled.div`
  display: flex;
  margin: 0.5em;
`;

interface BlogHandleProps {
  blog: IBlog;
}

export default function BlogHandle({ blog }: BlogHandleProps) {
  return (
    <Link href={`/blog/${blog.id}`} passHref>
      <a>
        <AvatarWithTextWrapper>
          <AvatarImage
            src={
              blog.blogProfile?.avatar && getFileUrl(blog.blogProfile.avatar)
            }
            alt="avatarImage"
          />
          <div>
            <div>{blog.preferredBlogName}</div>
            <div>{`@${blog.blogName}`}</div>
          </div>
        </AvatarWithTextWrapper>
      </a>
    </Link>
  );
}

import styled from 'styled-components';
import { useAuth } from '../auth/AuthContext';
import IPost from '../Types/IPost';
import LikeButton from './LikeButton';
import PostOptions from './PostOptions';

const SPostMenuContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface PostMenuProps {
  post: IPost;
  onSuccess: () => void;
}

export default function PostMenu({ post, onSuccess }: PostMenuProps) {
  const { user } = useAuth();
  return (
    <SPostMenuContainer>
      <LikeButton
        postId={post.id as string}
        liked={!!post.likes?.find((l) => l.liker.id === user?.activeBlog.id)}
        likeCount={post.likes?.length}
        onSuccess={onSuccess}
      />
      <PostOptions blog={post.blog} postId={post.id} onSuccess={onSuccess} />
    </SPostMenuContainer>
  );
}

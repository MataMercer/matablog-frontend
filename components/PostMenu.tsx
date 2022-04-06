import styled from 'styled-components';
import { useAuth } from '../auth/AuthContext';
import IPost from '../Types/IPost';
import LikeButton from './LikeButton';
import PostOptions from './PostOptions';

const SPostMenuContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const SPostMenuSubContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 20px;
`;

interface PostMenuProps {
  post: IPost;
  onSuccess: () => void;
}

export default function PostMenu({ post, onSuccess }: PostMenuProps) {
  const { user } = useAuth();
  return (
    <SPostMenuContainer>
      <SPostMenuSubContainer>
        <LikeButton
          postId={post.id as string}
          liked={!!post.likes?.find((l) => l.liker.id === user?.activeBlog.id)}
          likeCount={post.likes?.length}
          onSuccess={onSuccess}
        />
        <div>{post.replies.length} Replies</div>
      </SPostMenuSubContainer>
      <PostOptions blog={post.blog} postId={post.id} onSuccess={onSuccess} />
    </SPostMenuContainer>
  );
}

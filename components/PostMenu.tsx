import styled from 'styled-components';
import { useAuth } from '../auth/AuthContext';
import ProtectComponent from '../auth/ProtectComponent';
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

  align-items: center;
`;

interface PostMenuProps {
  post: IPost;
  onSuccess: () => void;
}

export default function PostMenu({ post, onSuccess }: PostMenuProps) {
  return (
    <SPostMenuContainer>
      <SPostMenuSubContainer>
        <LikeButton
          postId={post.id as string}
          liked={post.liked}
          likeCount={post.likeCount}
          onSuccess={onSuccess}
        />
        <div>{post.replies.length} Replies</div>
      </SPostMenuSubContainer>
      <PostOptions blog={post.blog} postId={post.id} onSuccess={onSuccess} />
    </SPostMenuContainer>
  );
}

import { useQueryClient } from 'react-query';
import styled from 'styled-components';
import { useAuth } from '../auth/AuthContext';
import ProtectComponent from '../auth/ProtectComponent';
import useLikes from '../backend/hooks/blog/useLikes';
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
}

export default function PostMenu({ post }: PostMenuProps) {
  const queryClient = useQueryClient();
  return (
    <SPostMenuContainer>
      <SPostMenuSubContainer>
        <LikeButton
          postId={post.id as string}
          likeCount={post.likeCount}
          onSuccess={() => {
            queryClient.invalidateQueries('likes');
            queryClient.invalidateQueries('posts');
            queryClient.invalidateQueries('post');
          }}
        />
        <div>{post.replyCount} Replies</div>
      </SPostMenuSubContainer>
      <PostOptions
        blog={post.blog}
        postId={post.id}
        onSuccess={() => {
          queryClient.invalidateQueries('posts');
        }}
      />
    </SPostMenuContainer>
  );
}

import { useQueryClient } from 'react-query';
import styled from 'styled-components';
import IPost from '../Types/IPost';
import BlogHandle from './BlogHandle';
import PostMenu from './PostMenu';

const PostReplyDisplayContainer = styled.div`
  border-top: 1px solid lightgray;
  padding: 2em;
`;

interface IPostReplyDisplay {
  post: IPost;
}

export default function PostReplyDisplay({ post }: IPostReplyDisplay) {
  const queryClient = useQueryClient();
  return (
    <PostReplyDisplayContainer>
      <BlogHandle blog={post.blog} />
      <div>{post.content}</div>
      <PostMenu
        post={post}
        onSuccess={() => {
          queryClient.invalidateQueries(['post', post?.parentPostId]);
        }}
      />
    </PostReplyDisplayContainer>
  );
}

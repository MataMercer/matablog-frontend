import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import ErrorAlert from './ErrorAlert';
import CenterSpinner from './CenterSpinner';
import usePosts from '../backend/hooks/post/usePosts';
import PostThumbnail from './PostThumbnail';
import IPost from '../Types/IPost';
import PaginationNav from './PaginationNav';
import { PostCategory } from '../Types/enums/PostCategory';
import { IGetPostsForm } from '../Types/requestTypes/IGetPostsRequest';

type PostListDisplayProps = {
  getPostsForm: IGetPostsForm;
  noPostsLabel: string;
};

const SPostList = styled.div`
  display: grid;
  justify-items: stretch;
  grid-template-columns: auto auto auto;
`;

export default function PostListDisplay({
  getPostsForm,
  noPostsLabel,
}: PostListDisplayProps) {
  const router = useRouter();
  const params = router.query;

  const page =
    params && params.page ? parseInt(params.page as string, 10) - 1 : 0;

  const {
    data: postsPage,
    status,
    error,
  } = usePosts({
    getPostsForm: {
      ...getPostsForm,
      page,
    },
  });
  const posts = postsPage?.content;
  const empty = postsPage?.empty;
  const totalPages = postsPage?.totalPages;

  return (
    <div>
      <div>
        <ErrorAlert {...{ error }} />
      </div>
      <CenterSpinner {...{ status }} />

      {posts && !empty && totalPages ? (
        <>
          <SPostList>
            {posts.map((post, index) => (
              <PostThumbnail key={post.id} post={post} />
            ))}
          </SPostList>

          <PaginationNav page={page} totalPages={totalPages} />
        </>
      ) : (
        <p>{noPostsLabel}</p>
      )}
    </div>
  );
}

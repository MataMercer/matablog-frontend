import { useRouter } from 'next/router';
import { Container, Row } from 'react-bootstrap';
import React from 'react';
import styled from 'styled-components';
import ErrorAlert from './ErrorAlert';
import CenterSpinner from './CenterSpinner';
import usePosts from '../backend/hooks/usePosts';
import PostThumbnail from './PostThumbnail';
import IPost from '../Types/IPost';
import PaginationNav from './PaginationNav';
import { PostCategory } from '../Types/enums/PostCategory';
import { IPostSearchForm } from '../Types/requestTypes/IPostSearchRequest';

type PostListDisplayProps = {
  postSearchForm: IPostSearchForm;
};

const SPostListContainer = styled.div`
  display: grid;
  justify-items: stretch;
  grid-template-columns: auto auto auto;
`;

export default function PostListDisplay({
  postSearchForm,
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
    postSearchForm: {
      ...postSearchForm,
      page,
    },
  });
  const projectEntriesPerRow = 4;
  const posts = postsPage?.content;
  const empty = postsPage?.empty;
  const totalPages = postsPage?.totalPages;

  return (
    <Container>
      <Row>
        <ErrorAlert {...{ error }} />
      </Row>
      <CenterSpinner {...{ status }} />

      {posts && !empty && totalPages ? (
        <>
          <SPostListContainer>
            {posts.map((post, index) => (
              <PostThumbnail
                key={post.id}
                id={post.id}
                title={post.title}
                content={post.content}
                postTags={post.postTags}
                attachments={post.attachments ? post.attachments : []}
                createdAt={post.createdAt}
                updatedAt={post.updatedAt}
                communityTaggingEnabled={post.communityTaggingEnabled}
                sensitive={post.sensitive}
                published={post.published}
                blog={post.blog}
                likes={post.likes}
                replies={post.replies}
              />
            ))}
          </SPostListContainer>

          <PaginationNav page={page} totalPages={totalPages} />
        </>
      ) : (
        <p>There are no posts yet.</p>
      )}
    </Container>
  );
}

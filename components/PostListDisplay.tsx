import { useRouter } from 'next/router';
import { Container, Row, Col } from 'react-bootstrap';
import React from 'react';
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

export default function PostListDisplay({
  postSearchForm,
}: PostListDisplayProps) {
  const router = useRouter();
  const params = router.query;

  const page =
    params && params.page ? parseInt(params.page as string, 10) - 1 : 0;

  const { postsPage, status, errors } = usePosts({
    initialLoad: !!params && !!postSearchForm,
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
        <ErrorAlert {...{ errors }} />
      </Row>
      <CenterSpinner {...{ status }} />

      {posts && !empty && totalPages ? (
        <>
          {posts.map((postRow, index) => {
            if (index % projectEntriesPerRow === 0) {
              return (
                // eslint-disable-next-line react/no-array-index-key
                <Row key={index}>
                  {posts
                    .slice(index, index + projectEntriesPerRow)
                    .map((post: IPost) => (
                      <Col md="3" key={post.id}>
                        <PostThumbnail
                          key={post.id}
                          id={post.id}
                          title={post.title}
                          content={post.content}
                          tags={post.tags}
                          attachments={post.attachments ? post.attachments : []}
                          createdAt={post.createdAt}
                          updatedAt={post.updatedAt}
                          communityTaggingEnabled={post.communityTaggingEnabled}
                          sensitive={post.sensitive}
                          published={post.published}
                          blog={post.blog}
                          likes={post.likes}
                        />
                      </Col>
                    ))}
                </Row>
              );
            }
            return null;
          })}

          <PaginationNav page={page} totalPages={totalPages} />
        </>
      ) : (
        <p>There are no posts yet.</p>
      )}
    </Container>
  );
}

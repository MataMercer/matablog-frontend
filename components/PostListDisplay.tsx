import ErrorAlert from './ErrorAlert';
import ProjectEntryThumbnail from './PostThumbnail';
import CenterSpinner from './CenterSpinner';
import { Container, Row, Col } from 'react-bootstrap';
import usePosts from '../backend/hooks/usePosts';
import React from 'react';
import PostThumbnail from './PostThumbnail';
import PostDisplay from './PostDisplay';
import IPost from '../modelTypes/IPost';

export default function PostListDisplay() {
  const { posts, status, errors } = usePosts({
    initialLoad: true,
    postSearchForm: {
      page: 0,
      pageSize: 20,
      category: 'ROOT',
    },
  });
  const projectEntriesPerRow = 3;

  return (
    <Container>
      <Row>
        <ErrorAlert {...{ errors }} />
      </Row>
      <CenterSpinner {...{ status }} />

      {Array.isArray(posts) ? (
        posts.map((postRow, index) => {
          if (index % projectEntriesPerRow === 0) {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <Row key={index}>
                {posts
                  .slice(index, index + projectEntriesPerRow)
                  .map((post: IPost) => (
                    <Col md="4" key={post.id}>
                      <PostThumbnail
                        key={post.id}
                        id={post.id}
                        title={post.title}
                        content={post.content}
                        tags={post.tags}
                        pictureUrls={post.pictureUrls}
                        createdAt={post.createdAt}
                        updatedAt={post.updatedAt}
                      />
                      <PostDisplay postLocal={post} />
                    </Col>
                  ))}
              </Row>
            );
          }
          return null;
        })
      ) : (
        <p>There are no posts yet.</p>
      )}
    </Container>
  );
}

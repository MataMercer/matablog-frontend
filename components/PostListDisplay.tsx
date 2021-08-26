import ErrorAlert from './ErrorAlert';
import ProjectEntryThumbnail from './PostThumbnail';
import CenterSpinner from './CenterSpinner';
import { Container, Row, Col } from 'react-bootstrap';
import usePosts from '../backend/hooks/usePosts';
import React, { useState } from 'react';
import PostThumbnail from './PostThumbnail';
import PostDisplay from './PostDisplay';
import IPost from '../modelTypes/IPost';
import PaginationNav from './PaginationNav';
import { useRouter } from 'next/router';

export default function PostListDisplay() {
  const router = useRouter();
  const params = router.query;

  const page = params && params.page ? parseInt(params.page as string) - 1 : 0;

  const { postsPage, status, errors } = usePosts({
    initialLoad: !!params,
    postSearchForm: {
      page: page,
      pageSize: 6,
      category: 'ROOT',
    },
  });
  const projectEntriesPerRow = 2;
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
                      <Col md="6" key={post.id}>
                        <PostThumbnail
                          key={post.id}
                          id={post.id}
                          title={post.title}
                          content={post.content}
                          tags={post.tags}
                          pictureUrls={post.pictureUrls ? post.pictureUrls : []}
                          createdAt={post.createdAt}
                          updatedAt={post.updatedAt}
                          communityTaggingEnabled={post.communityTaggingEnabled}
                          sensitive={post.sensitive}
                          published={post.published}
                        />
                        <PostDisplay postLocal={post} />
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

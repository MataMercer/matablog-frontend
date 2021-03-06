/* eslint-disable no-unused-vars */
import React, { useEffect, useCallback, useState } from 'react';
import { Container, Button, Modal, Row, Col, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import styled from 'styled-components';
import { useQueryClient } from 'react-query';
import IPost from '../Types/IPost';
import { getFileUrls } from '../backend/repositories/FileRepository';
import DateLabel from './DateLabel';
import LikeButton from './LikeButton';
import { useAuth } from '../auth/AuthContext';
import usePost from '../backend/hooks/post/usePost';
import PostOptions from './PostOptions';
import PostMenu from './PostMenu';
import BlogHandle from './blog/BlogHandle';

const ThumbnailImg = styled.img`
  object-fit: contain;
  height: 10em;
  width: 100%;
`;

const SPostThumbnailContainer = styled.div`
  border: 1px solid lightgray;
  padding: 20px;
`;

type PostThumbnailProps = {
  post: IPost;
};

export default function PostThumbnail({ post }: PostThumbnailProps) {
  const queryClient = useQueryClient();
  const { id, title, attachments, postTags, blog, createdAt } = post;
  const pictureUrls = attachments ? getFileUrls(attachments) : [];

  return (
    <SPostThumbnailContainer>
      <Row>
        <Link scroll={false} href={`/post/${id}`} passHref>
          <a>
            <ThumbnailImg
              src={pictureUrls.length > 0 ? pictureUrls[0] : '/no-image.png'}
              alt="ProjectEntryThumbnail"
            />
          </a>
        </Link>
      </Row>
      <div className="project-entry-text">
        {title && title !== 'undefined' && (
          <Row>
            <Link scroll={false} href={`/post/${id}`} passHref>
              <a>
                <h2>
                  <strong>{title}</strong>
                </h2>
              </a>
            </Link>
          </Row>
        )}

        <Row>
          <BlogHandle blog={blog} />
        </Row>
        <Row>{createdAt && <DateLabel label="" date={createdAt} />}</Row>
        <Row>
          <PostMenu
            post={post}
            onSuccess={() => {
              queryClient.invalidateQueries('posts');
            }}
          />
        </Row>
      </div>
    </SPostThumbnailContainer>
  );
}

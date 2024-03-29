/* eslint-disable no-unused-vars */
import React, { useEffect, useCallback, useState } from 'react';
import { Container, Button, Modal, Row, Col, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import styled from 'styled-components';
import { useQueryClient } from 'react-query';
import Image from 'next/image';
import IPost from '../Types/IPost';
import { getFileUrls } from '../backend/repositories/FileRepository';
import DateLabel from './DateLabel';
import LikeButton from './LikeButton';
import { useAuth } from '../auth/AuthContext';
import usePost from '../backend/hooks/post/usePost';
import PostOptions from './PostOptions';
import PostMenu from './PostMenu';
import BlogHandle from './blog/BlogHandle';

const ThumbnailImg = styled.div`
  height: 10em;
  width: 100%;
  position: relative;
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
  const { id, title, blog, createdAt, thumbImageUrl } = post;

  const src = thumbImageUrl || '/no-image.png';
  return (
    <SPostThumbnailContainer>
      <Row>
        <Link scroll={false} href={`/post/${id}`} passHref>
          <ThumbnailImg>
            <Image
              loader={() => src}
              src={src}
              alt="PostThumbnailImage"
              layout="fill"
              objectFit="contain"
            />
          </ThumbnailImg>
        </Link>
      </Row>
      <div className="project-entry-text">
        {title && title !== 'undefined' && (
          <Row>
            <Link scroll={false} href={`/post/${id}`} passHref>
              <h2>
                <strong>{title}</strong>
              </h2>
            </Link>
          </Row>
        )}

        <Row>
          <BlogHandle blog={blog} />
        </Row>
        <Row>{createdAt && <DateLabel label="" date={createdAt} />}</Row>
        <Row>
          <PostMenu post={post} />
        </Row>
      </div>
    </SPostThumbnailContainer>
  );
}

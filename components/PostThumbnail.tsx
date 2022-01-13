/* eslint-disable no-unused-vars */
import React, { useEffect, useCallback, useState } from 'react';
import { Container, Button, Modal, Row, Col, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import styled from 'styled-components';
import CompletionStatusBadge from './CompletionStatusBadge';
import IPost from '../Types/IPost';
import { getFileUrls } from '../backend/repositories/FileRepository';
import DateLabel from './DateLabel';
import LikeButton from './LikeButton';
import { useAuth } from '../auth/AuthContext';
import usePost from '../backend/hooks/usePost';

const ThumbnailImg = styled.img`
  object-fit: contain;
  height: 10em;
  width: 100%;
`;

export default function PostThumbnail(props: IPost) {
  const { user } = useAuth();

  const [post, setPost] = useState<IPost>(props);
  const { id, title, attachments, tags, blog, createdAt, likes } = post;
  const { data: fetchedPost } = usePost({ postId: id });
  const pictureUrls = attachments ? getFileUrls(attachments) : [];

  useEffect(() => {
    if (fetchedPost) {
      setPost(fetchedPost);
    }
  }, [fetchedPost]);

  return (
    <Container className="project-entry" color="primary">
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
        <Row>
          <Link scroll={false} href={`/post/${id}`} passHref>
            <a>
              <h2>
                <strong>{title}</strong>
              </h2>
            </a>
          </Link>
        </Row>
        <Row>
          <Link href={`/blog/${blog.blogName}`} passHref>
            <a>
              <h3>{`@${blog.blogName}`}</h3>
            </a>
          </Link>
        </Row>
        <Row>{createdAt && <DateLabel label="" date={createdAt} />}</Row>
        <Row>
          <LikeButton
            postId={id as string}
            liked={!!likes?.find((l) => l.liker.id === user?.activeBlog.id)}
            likeCount={likes?.length}
          />
        </Row>
      </div>
    </Container>
  );
}

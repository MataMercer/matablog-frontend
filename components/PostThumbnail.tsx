/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Container, Button, Modal, Row, Col, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import CompletionStatusBadge from './CompletionStatusBadge';
import IPost from '../modelTypes/IPost';
import styled from 'styled-components';

const ThumbnailImg = styled.img`
  object-fit: contain;
  height: 10em;
  width: 100%;
`;

const PostThumbnail = (props: IPost) => {
  const { id, title, pictureUrls, tags } = props;

  return (
    <Link scroll={false} href={`/post/${id}`}>
      <Container className="project-entry" color="primary">
        <Row>
          <Col>
            <ThumbnailImg
              src={pictureUrls.length > 0 ? pictureUrls[0] : '/no-image.png'}
              alt="ProjectEntryThumbnail"
            />
          </Col>
        </Row>
        <div className="project-entry-text">
          <Row>
            <Col>
              <h2>
                <strong>{title}</strong>
              </h2>
            </Col>
          </Row>
          {tags ? (
            <Row>
              <Col>
                {Object.keys(tags).map((tag) => (
                  <Badge key={tag} color="info">
                    {tag}
                  </Badge>
                ))}
              </Col>
            </Row>
          ) : null}
        </div>
      </Container>
    </Link>
  );
};

export default PostThumbnail;

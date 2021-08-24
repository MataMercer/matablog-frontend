/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Container, Button, Modal, Row, Col, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import CompletionStatusBadge from './CompletionStatusBadge';
import IPost from '../modelTypes/IPost';

const PostThumbnail = (props: IPost) => {
  const { id, title, content, pictureUrls, tags } = props;

  const ImageShowSecondPictureOnHover = ({ pictureSrc, altText }: any) => {
    return (
      <div>
        <img src={pictureSrc} alt={altText} />
      </div>
    );
  };

  return (
    <Link
      scroll={false}
      href={`/?projectentryid=${id}`}
      as={`/projectentry/${id}`}
    >
      <a className="project-entry-anchor">
        <Container className="project-entry" color="primary">
          <Row>
            <Col>
              <img
                className={`project-entry-thumbnail-image ${
                  pictureUrls.length > 1
                    ? 'project-entry-thumbnail-image-first'
                    : ''
                }`}
                src={pictureUrls.length > 0 ? pictureUrls[0] : '/no-image.png'}
                alt="ProjectEntryThumbnail"
              />
              {pictureUrls.length > 1 ? (
                <img
                  className="project-entry-thumbnail-image-second"
                  src={
                    pictureUrls.length > 1 ? pictureUrls[1] : '/no-image.png'
                  }
                  alt="ProjectEntryThumbnail"
                />
              ) : null}
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
      </a>
    </Link>
  );
};

export default PostThumbnail;

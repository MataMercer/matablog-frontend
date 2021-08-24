/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useRouter } from 'next/router';
import Skeleton from 'react-loading-skeleton';
import ThumbnailCarousel from './ThumbnailCarousel';
import ErrorAlert from './ErrorAlert';
import usePost from '../backend/hooks/usePost';
import IPost from '../modelTypes/IPost';
import { Badge, Row, Col, Container, Modal, ModalBody } from 'react-bootstrap';
type ProjectEntryProps = {
  postId?: string;
  postLocal?: IPost;
  setPageTitle?: (pageTitle: string) => void;
};

const ProjectEntry = ({
  postId,
  postLocal,
  setPageTitle,
}: ProjectEntryProps) => {
  const [postState, setPostState] = useState<IPost>();
  const {
    post: fetchedPost,
    status,
    errors,
  } = usePost({ initialLoad: !!postId, postId });
  const router = useRouter();

  useEffect(() => {
    setPostState(postId ? fetchedPost : postLocal);
    if (setPageTitle && postState) {
      setPageTitle(postState.title);
    }
  }, [postId, fetchedPost, postLocal, setPageTitle, postState]);

  const Carousel = () => (
    <ThumbnailCarousel
      pictureUrls={
        postState?.pictureUrls && postState.pictureUrls.length > 0
          ? postState.pictureUrls
          : ['/no-image.png']
      }
    />
  );

  const LoadingPlaceholder = () => (
    <>
      <Skeleton height={50} />
      <Skeleton count={2} />
      <Row>
        <Col>
          <Skeleton />
        </Col>
        <Col>
          <Skeleton />
        </Col>
        <Col>
          <Skeleton />
        </Col>
        <Col>
          <Skeleton />
        </Col>
      </Row>
      <Skeleton count={15} />
    </>
  );

  const Text = () => {
    if (status === 'loading' && !postLocal) {
      return <LoadingPlaceholder />;
    }
    if (postState) {
      const { title, content, tags } = postState;
      return (
        <>
          <Row>
            <ErrorAlert errors={errors} />
          </Row>
          <Row>
            <h2>{title}</h2>
          </Row>
          {tags ? (
            <Row>
              {Object.keys(tags).map((tag) => (
                <Badge key={tag} color="info">
                  {tag}
                </Badge>
              ))}
            </Row>
          ) : null}
          <Row>
            <ReactMarkdown>{content}</ReactMarkdown>
          </Row>
        </>
      );
    }
    return <></>;
  };

  return postId ? (
    <Row>
      <Col lg="8" className="project-entry-thumbnail-carousel-panel-no-modal">
        <Container>
          <Carousel />
        </Container>
      </Col>
      <Col lg="4" className="project-entry-thumbnail-text-panel-no-modal">
        <Modal.Header closeButton />
        <Container>
          <Text />
        </Container>
      </Col>
    </Row>
  ) : (
    <Modal
      contentClassName="project-entry-modal"
      centered
      size="xl"
      toggle={() => router.push('/')}
      isOpen={router.query.postId === postLocal?.id}
    >
      <Row>
        <Col lg="8" className="project-entry-thumbnail-carousel-panel-modal">
          <Carousel />
        </Col>
        <Col lg="4" className="project-entry-thumbnail-text-panel-modal">
          <ModalBody>
            <Modal.Header closeButton />
            <Text />
          </ModalBody>
        </Col>
      </Row>
    </Modal>
  );
};

export default ProjectEntry;

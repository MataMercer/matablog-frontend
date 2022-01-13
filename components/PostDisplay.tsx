/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useRouter } from 'next/router';
import Skeleton from 'react-loading-skeleton';
import { Badge, Row, Col, Container } from 'react-bootstrap';
import { UseQueryResult } from 'react-query';
import { ApiError } from 'next/dist/server/api-utils';
import ThumbnailCarousel from './ThumbnailCarousel';
import ErrorAlert from './ErrorAlert';
import usePost from '../backend/hooks/usePost';
import { getFileUrls } from '../backend/repositories/FileRepository';
import DateLabel from './DateLabel';
import IPost from '../Types/IPost';
type PostDisplayProps = {
  postId: string;
  setPageTitle?: (pageTitle: string) => void;
};

function LoadingPlaceholder() {
  return (
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
}

type CarouselProps = {
  pictureUrls: string[];
};
function Carousel({ pictureUrls }: CarouselProps) {
  return (
    <ThumbnailCarousel
      pictureUrls={pictureUrls.length > 0 ? pictureUrls : ['/no-image.png']}
    />
  );
}

function Text({ data: post, error, status }: UseQueryResult<IPost, ApiError>) {
  if (status === 'loading') {
    return <LoadingPlaceholder />;
  }
  if (post) {
    const { title, content, tags } = post;
    return (
      <>
        <Row>
          <ErrorAlert errors={error ? [error] : []} />
        </Row>
        <Row>
          <h2>{title}</h2>
        </Row>
        <Row>
          <ReactMarkdown>{content}</ReactMarkdown>
        </Row>
        {tags && (
          <div>
            {tags.map((t) => (
              <Badge bg="secondary" key={t.id}>
                {t.name}
              </Badge>
            ))}
          </div>
        )}

        {post.createdAt && post.updatedAt && (
          <>
            <Row>
              <DateLabel label="Created At: " date={post.createdAt} />
            </Row>
            <Row>
              <DateLabel label="Updated At: " date={post.updatedAt} />
            </Row>
          </>
        )}
      </>
    );
  }
  return null;
}
export default function PostDisplay({
  postId,
  setPageTitle,
}: PostDisplayProps) {
  const { data: post, status, error } = usePost({ postId });
  const router = useRouter();

  useEffect(() => {
    if (setPageTitle && post) {
      setPageTitle(post.title);
    }
  }, [postId, setPageTitle]);

  const api = useApi();
  const pictureUrls = post?.attachments ? getFileUrls(post?.attachments) : [];

  return (
    <>
      {pictureUrls.length > 0 && (
        <Row className="project-entry-thumbnail-carousel-panel-no-modal">
          <Container>
            <Carousel pictureUrls={pictureUrls} />
          </Container>
        </Row>
      )}
      <Row className="project-entry-thumbnail-text-panel-no-modal">
        <Container>
          <Text />
        </Container>
      </Row>
    </>
  );
}

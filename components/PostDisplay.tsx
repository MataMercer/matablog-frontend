/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useRouter } from 'next/router';
import Skeleton from 'react-loading-skeleton';
import ThumbnailCarousel from './ThumbnailCarousel';
import ErrorAlert from './ErrorAlert';
import usePost from '../backend/hooks/usePost';
import { Badge, Row, Col, Container } from 'react-bootstrap';
import { getFileUrls } from '../backend/repositories/FileRepository';
import DateLabel from './DateLabel';
type PostDisplayProps = {
  postId?: string;
  setPageTitle?: (pageTitle: string) => void;
};

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

type CarouselProps = {
  pictureUrls: string[];
};
const Carousel = ({ pictureUrls }: CarouselProps) => (
  <ThumbnailCarousel
    pictureUrls={pictureUrls.length > 0 ? pictureUrls : ['/no-image.png']}
  />
);

export default function PostDisplay({
  postId,
  setPageTitle,
}: PostDisplayProps) {
  const { post, status, errors } = usePost({ initialLoad: !!postId, postId });
  const router = useRouter();

  useEffect(() => {
    if (setPageTitle && post) {
      setPageTitle(post.title);
    }
  }, [postId, setPageTitle]);

  const pictureUrls = post?.attachments ? getFileUrls(post?.attachments) : [];

  const Text = () => {
    if (status === 'loading') {
      return <LoadingPlaceholder />;
    }
    if (post) {
      const { title, content, tags } = post;
      console.log(post);
      return (
        <>
          <Row>
            <ErrorAlert errors={errors} />
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
    return <></>;
  };

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

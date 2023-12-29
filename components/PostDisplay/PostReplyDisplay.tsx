/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useRouter } from 'next/router';
import Skeleton from 'react-loading-skeleton';
import { Badge, Row, Col, Container } from 'react-bootstrap';
import { UseQueryResult } from 'react-query';
import ThumbnailCarousel from '../ThumbnailCarousel';
import ErrorAlert from '../ErrorAlert';
import usePost from '../../backend/hooks/post/usePost';
import { getFileUrls } from '../../backend/repositories/FileRepository';
import DateLabel from '../DateLabel';
import IPost from '../../Types/IPost';
import { ApiError } from '../../Types/IApiError';

type PostDisplayProps = {
  postId: string;
  setPageTitle?: (pageTitle: string) => void;
};

function LoadingPlaceholder() {
  return (
    <>
      <Skeleton height={50} />
      <Skeleton count={2} />
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

type TextProps = {
  queryResult: UseQueryResult<IPost, ApiError>;
};
function Text({ queryResult }: TextProps) {
  const { data: post, status, error } = queryResult;
  if (status === 'loading') {
    return <LoadingPlaceholder />;
  }
  if (post) {
    const { title, content, postTags } = post;
    return (
      <>
        <Row>
          <ErrorAlert error={error} />
        </Row>
        <Row>
          <ReactMarkdown>{content}</ReactMarkdown>
        </Row>
        {postTags && (
          <div>
            {postTags.map((t) => (
              <Badge bg="secondary" key={t.id}>
                {t.name}
              </Badge>
            ))}
          </div>
        )}

        {post.createdAt && post.updatedAt && (
          <Row>
            <DateLabel label="Updated At: " date={post.updatedAt} />
          </Row>
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
  const useQueryResult = usePost({ postId });
  const { data: post, status, error } = useQueryResult;
  const router = useRouter();

  useEffect(() => {
    if (setPageTitle && post) {
      setPageTitle(post.title);
    }
  }, [post, postId, setPageTitle]);

  const pictureUrls = (post as any)?.attachmentUrls || [];

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
          <Text queryResult={useQueryResult} />
        </Container>
      </Row>
    </>
  );
}

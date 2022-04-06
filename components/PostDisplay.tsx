/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useRouter } from 'next/router';
import Skeleton from 'react-loading-skeleton';
import { Badge, Row, Col, Container } from 'react-bootstrap';
import { useQueryClient, UseQueryResult } from 'react-query';
import { ApiError } from 'next/dist/server/api-utils';
import ThumbnailCarousel from './ThumbnailCarousel';
import ErrorAlert from './ErrorAlert';
import usePost from '../backend/hooks/usePost';
import { getFileUrls } from '../backend/repositories/FileRepository';
import DateLabel from './DateLabel';
import IPost from '../Types/IPost';
import PostMenu from './PostMenu';
import CenterSpinner from './CenterSpinner';
import PostForm from './forms/PostForm';
import BlogHandle from './BlogHandle';
import PostReplyDisplay from './PostReplyDisplay';
import Link from 'next/link';

type PostDisplayProps = {
  postId: string;
  setPageTitle?: (pageTitle: string) => void;
};

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
    return <CenterSpinner status={status} />;
  }
  if (post) {
    const { title, content, postTags } = post;
    return (
      <>
        <Row>
          <ErrorAlert error={error} />
        </Row>
        <Row>
          <h2>{title}</h2>
        </Row>
        <Row>
          <BlogHandle blog={post.blog} />
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
          <>
            <Row>
              <DateLabel label="Created: " date={post.createdAt} />
            </Row>
            <Row>
              <DateLabel label="Updated: " date={post.updatedAt} />
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
  const useQueryResult = usePost({ postId });
  const { data: post, status, error } = useQueryResult;
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (setPageTitle && post) {
      setPageTitle(post.title);
    }
  }, [post, postId, setPageTitle]);

  const pictureUrls = post?.attachments ? getFileUrls(post?.attachments) : [];

  return (
    <>
      {post?.parentPostId !== 'null' && (
        <div>
          <Link href={`/post/${post?.parentPostId}`}>Reply To</Link>
        </div>
      )}

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
      {post && (
        <PostMenu
          post={post}
          onSuccess={() => {
            queryClient.invalidateQueries(['post', post.id]);
          }}
        />
      )}

      <div>
        <h3>Replies</h3>
        <PostForm
          postId=""
          parentPostId={post?.id}
          onSuccess={() => {
            queryClient.invalidateQueries(['post', post?.id]);
          }}
        />

        <div>
          {post?.replies.map((it) => (
            <PostReplyDisplay post={it} />
          ))}
        </div>
      </div>
    </>
  );
}

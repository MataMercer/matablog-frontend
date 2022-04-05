import { useEffect } from 'react';
import { Button, Row } from 'react-bootstrap';
import useBlog from '../backend/hooks/useBlog';
import CenterSpinner from './CenterSpinner';
import ErrorAlert from './ErrorAlert';
import PostCategoryTabs from './PostCategoryTabs';
import { SButton } from './styles/Button.styled';

type BlogProfileProps = {
  blogId: string;
  setPageTitle: (pageTitle: string) => void;
};

export default function BlogProfile({
  blogId,
  setPageTitle,
}: BlogProfileProps) {
  const {
    data: blog,
    error,
    status,
  } = useBlog({
    blogId,
  });

  useEffect(() => {
    if (status === 'success' && blog) {
      setPageTitle('blog');
    }
  }, [status]);
  return (
    <>
      <ErrorAlert error={error} />
      <CenterSpinner status={status} />
      {blog && (
        <>
          <Row>
            <h1>{`${blog?.preferredBlogName}`}</h1>
          </Row>
          <Row>
            <h2>{`@${blog.blogName}`}</h2>
          </Row>
          <Row>
            <SButton>Follow</SButton>
          </Row>
          <PostCategoryTabs postSearchForm={{ blogName: blog.blogName }} />
        </>
      )}
    </>
  );
}

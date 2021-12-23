import router from 'next/router';
import { Button, Row } from 'react-bootstrap';
import useBlog from '../backend/hooks/useBlog';
import CenterSpinner from './CenterSpinner';
import ErrorAlert from './ErrorAlert';
import PostCategoryTabs from './PostCategoryTabs';
import PostListDisplay from './PostListDisplay';

type BlogProfileProps = {
  blogName: string;
  setPageTitle?: (pageTitle: string) => void;
};

export default function BlogProfile({ blogName }: BlogProfileProps) {
  const { blog, status, errors } = useBlog({
    initialLoad: !!blogName,
    blogName,
  });
  return (
    <>
      <ErrorAlert errors={errors} />
      <CenterSpinner status={status} />
      {blog && (
        <>
          <Row>
            <h1>{`${blog?.preferredBlogName}`}</h1>
          </Row>
          <Row>
            <h2>{`@${blogName}`}</h2>
          </Row>
          <Row>
            <Button>Follow</Button>
          </Row>
          <PostCategoryTabs postSearchForm={{ blogName }} />
        </>
      )}
    </>
  );
}

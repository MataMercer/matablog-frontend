import Link from 'next/link';
import IBlog from '../Types/IBlog';

interface BlogHandleProps {
  blog: IBlog;
}

export default function BlogHandle({ blog }: BlogHandleProps) {
  return (
    <Link href={`/blog/${blog.id}`} passHref>
      <a>{`@${blog.blogName}`}</a>
    </Link>
  );
}

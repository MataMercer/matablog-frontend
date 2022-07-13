import Link from 'next/link';
import IBlog from '../../Types/IBlog';

type BlogThumbnailProps = {
  blog: IBlog;
};

export default function BlogThumbnail({ blog }: BlogThumbnailProps) {
  return (
    <div>
      <Link href={`/blog/${blog.id}`}>
        <div>
          <div>{blog.preferredBlogName}</div>
          <div>{`@${blog.blogName}`}</div>
        </div>
      </Link>
    </div>
  );
}

/* eslint-disable no-plusplus */
import Link from 'next/link';
import router from 'next/router';
import { Pagination } from 'react-bootstrap';

type PaginationNavProps = {
  page: number;
  totalPages: number;
};
export default function PaginationNav({
  page,
  totalPages,
}: PaginationNavProps) {
  const items = [];

  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Link
        key={number}
        href={{
          query: { page: number },
        }}
        passHref
      >
        <Pagination.Item key={number} active={number === page + 1}>
          {number}
        </Pagination.Item>
      </Link>
    );
  }

  return (
    <>
      <Pagination>{items}</Pagination>
      <br />
    </>
  );
}

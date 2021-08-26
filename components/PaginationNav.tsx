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
  let items = [];

  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === page + 1}
        onClick={() => {
          router.push({
            query: { page: number },
          });
        }}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <>
      <Pagination>{items}</Pagination>
      <br />
    </>
  );
}

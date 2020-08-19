import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface Pagination {
  companiesPerPage: number;
  total: number;
  paginate: any;
}

export const Pagination = ({
  companiesPerPage,
  total,
  paginate
}: Pagination) => {
  const pageNumbers = [];
  const router = useRouter();
  for (let i = 1; i < Math.ceil(total / companiesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((page: number) => (
          <li key={page} className="page-item">
            <Link key={page} href="?slug=" as={`?slug=`}>
              <a
                className={
                  (router.query.slug = page ? `${router.query.slug}` : '')
                }
                onClick={() => paginate(page)}
              >
                {page}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

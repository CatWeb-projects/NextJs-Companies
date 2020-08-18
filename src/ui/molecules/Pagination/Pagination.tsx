import React from 'react';
import { useRouter } from 'next/router';

export const Pagination = ({ companiesPerPage, total, paginate }: any) => {
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
            <a
              href=""
              className={
                (router.query.slug = page ? `${router.query.slug}` : '')
              }
              onClick={() => paginate(page)}
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

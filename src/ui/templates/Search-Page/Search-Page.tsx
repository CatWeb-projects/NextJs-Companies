import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Search } from 'ui/molecules/Search/Search';
import { Footer } from 'ui/molecules/Footer/Footer';
import { SearchCompanies } from 'ui/organisms/Search-Companies/Search-Companies';
import { useRouter } from 'next/router';
import { listCompanies, getAllCompanies } from 'services/companies-services';
import { Company, Data } from '../Company/Company';
import { Pagination } from 'ui/molecules/Pagination/Pagination';

export const SearchPage = () => {
  const [company, setCompany] = useState<Company[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [companiesPerPage] = useState<number>(24);
  const router = useRouter();

  useEffect(() => {
    return () => {
      getAllCompanies.cancel();
      listCompanies.cancel();
    };
  }, []);

  useEffect(() => {
    const getCompanyInfo = async () => {
      if (router.query.slug) {
        try {
          const companyInfo = await listCompanies.request(router.query.slug);
          setCompany(companyInfo.data);
          setLoading(false);
        } catch (error) {
          // eslint-disable-next-line
          console.error(error);
          setLoading(false);
        }
      } else if (router.query.slug === '') {
        const companyInfo = await getAllCompanies.request();
        setCompany(companyInfo);
        setLoading(false);
      }
    };
    getCompanyInfo();
  }, [router.query]);

  const clearData = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    router.query.slug === '';
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompany = company.slice(indexOfFirstCompany, indexOfLastCompany);

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css"
        ></link>
      </Head>
      <div className="search-container-page">
        <div className="search-container-page__nav">
          <div className="search-container-page__nav-logo">
            <Link href="/">
              <a>
                <img src="/logo-small.png" alt="" />
              </a>
            </Link>
          </div>
        </div>
        <div className="search-container-page__search-layout">
          <div className="search-container-page__search">
            <Search />
            <div className="search-container__search-type search-type-info">
              <span>Search in</span>
              <label>
                <span>Companies</span>
              </label>
              <label>
                <span>Persons</span>
              </label>
            </div>
            <div className="search-container-page__data" onClick={clearData}>
              <i className="fas fa-filter"></i> {`${router.query.slug}  `}
              <i className="fas fa-times"></i>
            </div>
          </div>
        </div>
        {loading === false ? (
          <div className="search-layout-content">
            <div className="search-layout-content__results">
              <i className="fas fa-suitcase-rolling"></i> {company.length} of
              results
            </div>
            <div
              className={
                company.length === 0 ? 'chech-result' : 'no-result-true'
              }
            >
              <i className="fas fa-folder-open"></i>
            </div>
            {company &&
              currentCompany.map((item) => (
                <SearchCompanies key={item.idno} propsData={item} />
              ))}
            <Pagination
              companiesPerPage={companiesPerPage}
              total={company.length}
              paginate={paginate}
            />
          </div>
        ) : (
          <div className="loader-div">
            <img src="/spinner.gif" alt="" />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};
SearchPage.getInitialProps = async (): Promise<{
  data: Data;
}> => {
  const data = await listCompanies.request('');
  return {
    data
  };
};

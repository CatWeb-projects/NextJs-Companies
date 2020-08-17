import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Search } from 'ui/molecules/Search/Search';
import { Footer } from 'ui/molecules/Footer/Footer';
import { SearchCompanies } from 'ui/organisms/Search-Companies/Search-Companies';
import { useRouter } from 'next/router';
import { listCompanies } from 'services/companies-services';

export const SearchPage = ({ data }: any) => {
  const [company, setCompany] = useState<any>([]);
  const router = useRouter();

  useEffect(() => {
    const getCompanyInfo = async () => {
      if (router.query.slug) {
        try {
          const companyInfo = await listCompanies.request(router.query.slug);
          console.log(companyInfo.data);
          setCompany(companyInfo.data);
        } catch (error) {
          // eslint-disable-next-line
          console.error(error);
        }
      }
    };
    getCompanyInfo();
  }, [router.query]);

  const clearData = (e: any) => {
    e.preventDefault();
    return router.query.slug === '';
  };

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
            <Search findings={data} />
            <div className="search-container__search-type search-type-info">
              <span>Search in</span>
              <label>
                <span>Companies</span>
              </label>
              <label>
                <span>Persons</span>
              </label>
            </div>
            <div className="search-container-page__data">
              <i className="fas fa-filter"></i> {`${router.query.slug}  `}
              <i className="fas fa-times" onClick={clearData}></i>
            </div>
          </div>
        </div>
        <div className="search-layout-content">
          <div className="search-layout-content__results">
            <i className="fas fa-suitcase-rolling"></i> {company.length} of
            results
          </div>
          <div
            className={company.length === 0 ? 'chech-result' : 'no-result-true'}
          >
            <i className="fas fa-folder-open"></i>
          </div>
          {company ? (
            company.map((item: any) => (
              <SearchCompanies
                key={item.idno}
                findings={data}
                propsData={item}
              />
            ))
          ) : (
            <div className="loader-div">
              <img src="/spinner.gif" alt="" />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

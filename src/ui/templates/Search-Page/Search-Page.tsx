import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Search } from 'ui/molecules/Search/Search';
import { Footer } from 'ui/molecules/Footer/Footer';
import { SearchCompanies } from 'ui/organisms/Search-Companies/Search-Companies';

export const SearchPage = ({ data }: any) => {
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
          </div>
        </div>
        <div className="search-layout-content">
          {/* {buttonLoader ? <SearchCompany /> : <SearchEmployers />} */}
          <SearchCompanies />
        </div>
      </div>
      <Footer />
    </>
  );
};

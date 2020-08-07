import React from 'react';
import Head from 'next/head';
import { Search } from 'ui/molecules/Search/Search';

export interface Finding {
  name: string;
  slug: string;
  idno: string;
}

export const CompaniesMain = () => {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css"
        ></link>
      </Head>
      <div className="search-container">
        <div className="search-container__holder">
          <img src="Logo.png" alt="" />
          <span>
            The largest database of companies and employees in Moldova
          </span>
          <Search />
        </div>
        <div className="search-container__search-type">
          <span>Search in</span>
          <label>
            <span>Companies</span>
          </label>
          <label>
            <span>Persons</span>
          </label>
        </div>
        <div className="copyright-container">
          <div className="copyright-container__support">
            <span>English</span>
            <a href="#">Login</a>
            <a href="#">View All</a>
            <a href="#">Help & Support</a>
          </div>
          <div className="copyright-container__informer">
            <span>© 2020 informer.md</span>
          </div>
        </div>
      </div>
    </>
  );
};

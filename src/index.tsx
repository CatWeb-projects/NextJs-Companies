import React from 'react';
import Head from 'next/head';
import { Search } from 'ui/molecules/Search/Search';
import { Footer } from 'ui/molecules/Footer/Footer';

export interface Findings {
  name: string;
  slug: string;
  idno: string;
}

export interface Props {
  data: Findings[];
}

export const CompaniesMain = ({ data }: Props) => {
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
          <img src="/Logo.png" alt="" />
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
      </div>
      <Footer />
    </>
  );
};

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { getCompany } from 'services/companies-services';
import { useRouter } from 'next/router';

export const Company = () => {
  const [company, setCompany] = useState<any>([]);

  const router = useRouter();

  useEffect(() => {
    const getCompanyInfo = async () => {
      try {
        const companyInfo = await getCompany();
        console.log(companyInfo);
        setCompany(companyInfo);
      } catch (error) {
        // eslint-disable-next-line
        console.error(error);
      }
    };
    getCompanyInfo();
    console.log(company);
  }, []);

  useEffect(() => {
    if (!company.name) {
      router.push('[slug]', `${router.query.slug}`);
      console.log(router.query.slug);
    }
  }, []);

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css"
        ></link>
      </Head>
      <div className="company-container">
        <div className="company-container__header">
          <div className="company-container__nav">
            <div className="company-container__nav-logo">
              <Link href="/">
                <a>
                  <img src="/logo-small.png" alt="" />
                </a>
              </Link>
            </div>
            <div className="company-container__nav-search">
              <input type="text" placeholder="Search from 226 515 companies" />
              <a href="">
                <i className="fas fa-search"></i>
              </a>
              <a
                className="company-container__nav-link"
                href="/en/ls/list/companies/page/1"
              >
                Show all
              </a>
            </div>
          </div>
        </div>
        <div className="company-content">
          <div className="company-content__industry">
            <div className="company-content__image">
              <img src="" alt="" />
            </div>
            <div className="company-content__info">
              <h1>{company.name}</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

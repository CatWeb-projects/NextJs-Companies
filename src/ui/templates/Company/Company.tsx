import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { getCompany } from 'services/companies-services';
import { useRouter } from 'next/router';
import { Search } from 'ui/molecules/Search/Search';
import { Footer } from 'ui/molecules/Footer/Footer';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import config from '../../../../config';

export interface GeneralData {
  partners: string[];
  email: string | null;
  phone: string | null;
  mobile: string | null;
  industry: string;
  employees: string;
  creation_year: number;
  name: string;
  location: any;
  slug: any;
  website: string | null;
  business_hours: string[];
  contact_info: [] | {};
  creation_date: string | string[] | null;
  description: string;
  idno: string;
  size: {
    name: string;
  };
  turnover: string[];
}

export interface Company {
  idno: string | number | null | undefined;
  general_data: GeneralData[];
  history: string[];
  creation_year: number;
  email: boolean;
  employees: string;
  industry: string;
  location: string;
  mobile: boolean;
  name: string;
  phone: boolean;
  slug: string;
  turnover: number;
  website: string;
  partners: string[];
}
export interface Data {
  idno: string | number | null | undefined;
  data: GeneralData;
}

export interface Hour {
  title: string;
  value: string;
}

export const Company = ({ data }: Data) => {
  const [company, setCompany] = useState<Company[]>([]);

  const router = useRouter();

  useEffect(() => {
    const getCompanyInfo = async () => {
      if (router.query.slug) {
        try {
          const companyInfo = await getCompany.request(router.query.slug);
          setCompany(companyInfo);
        } catch (error) {}
      }
    };
    getCompanyInfo();
  }, [router.query]);

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
              <Search />
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
        {company.general_data ? (
          <div className="company-content">
            <div className="company-content__general">
              <div className="company-content__industry">
                <div className="company-content__image">
                  <img
                    src={
                      company.history
                        ? company.history[0].company_url
                          ? `https://account.globaldatabase.com/logo/${company.history[0].company_url.substring(
                              7,
                              company.history[0].company_url.length
                            )}/`
                          : '/placeholder.png'
                        : '/placeholder.png'
                    }
                    alt=""
                  />
                </div>
                <div className="company-content__info">
                  <div className="company-content__name">
                    <span>{company.name}</span>
                    <span>{company.status ? company.status.title : null}</span>
                  </div>
                  <div className="company-content__area">
                    <span>
                      {company.general_data
                        ? company.general_data.special_description
                          ? company.general_data.special_description.title
                          : null
                        : null}
                    </span>
                  </div>
                </div>
              </div>
              <div className="company-content__profile">
                <span>General dates</span>
                <span>Personal</span>
                <span>Subdivisions</span>
                <span>Economic Data</span>
                <span>Publications</span>
                <span>Legal data</span>
              </div>
            </div>
            <div className="company-content-data">
              <div className="company-content-data__card">
                <div className="company-content-data__card-header">IDNO</div>
                <div className="company-content-data__card-content">
                  {company.general_data ? company.general_data.idno : null}
                </div>
              </div>
              <div className="company-content-data__card">
                <div className="company-content-data__card-header">
                  Registration year
                </div>
                <div className="company-content-data__card-content">
                  {company.general_data
                    ? company.general_data.creation_date
                    : null}
                </div>
              </div>
              <div className="company-content-data__card">
                <div className="company-content-data__card-header">Staff</div>
                <div className="company-content-data__card-content">
                  {company.general_data ? company.general_data.size.name : null}
                </div>
              </div>
            </div>
            <div className="company-card-wrapper">
              <div className="company-card-wrapper__card">
                <div className="company-card-wrapper__card-header">
                  Company Profile
                </div>
                <div className="company-card-wrapper__card-content">
                  {company.general_data
                    ? company.general_data.description
                    : null}
                </div>
              </div>
              <div className="company-card-wrapper__card">
                <div className="company-card-wrapper__card-header">
                  Workhours
                </div>
                <div className="company-card-wrapper__card-content">
                  {company.general_data
                    ? company.general_data.business_hours.map((hour: Hour) => (
                        <div
                          key={hour.title}
                          className="company-card-wrapper__table"
                        >
                          <div className="company-card-wrapper__day">
                            {hour.title}
                          </div>
                          <div className="company-card-wrapper__hours">
                            {hour.value}
                          </div>
                        </div>
                      ))
                    : null}
                </div>
              </div>
            </div>
            <div className="company-card-contact-info">
              <div className="company-card-contact-info__card">
                <div className="company-card-contact-info__header">
                  Contact Information
                </div>
                <div className="company-card-contact-info__content">
                  <div className="company-card-contact-info__info">
                    <div className="company-card-contact-info__email">
                      <span>EMAIL:</span>
                      <span>
                        {company.general_data ? (
                          company.general_data.contact_info.emails[0] ? (
                            <i className="far fa-envelope"></i>
                          ) : null
                        ) : null}
                        {company.general_data
                          ? company.general_data.contact_info.emails[0]
                            ? 'Email'
                            : null
                          : null}
                      </span>
                    </div>
                    <div className="company-card-contact-info__phone">
                      <span>PHONE/CELL PHONE/FAX:</span>
                      <span>
                        {company.general_data ? (
                          company.general_data.contact_info.phones[0] ? (
                            <i className="fas fa-phone"></i>
                          ) : null
                        ) : null}
                        {company.general_data
                          ? company.general_data.contact_info.phones[0]
                            ? 'Phone'
                            : null
                          : null}
                      </span>
                      <span>
                        {company.general_data ? (
                          company.general_data.contact_info.faxes[0] ? (
                            <i className="fas fa-fax"></i>
                          ) : null
                        ) : null}
                        {company.general_data
                          ? company.general_data.contact_info.faxes[0]
                            ? 'Fax'
                            : null
                          : null}
                      </span>
                    </div>
                  </div>
                  <div className="company-card-contact-info__website">
                    <span>WEBSITE :</span>
                    <a
                      href={
                        company.general_data
                          ? company.general_data.contact_info.sites[0]
                          : null
                      }
                    >
                      <span>
                        {company.general_data
                          ? company.general_data.contact_info.sites[0]
                          : null}
                      </span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="company-card-contact-info__card google-maps-container">
                {company.general_data.contact_info.address_de_facto.title ? (
                  <div className="company-card-contact-info__info-map">
                    <span>
                      <i className="fas fa-map-marker-alt"></i>
                      {company.general_data.contact_info.address_de_facto.title}
                    </span>
                  </div>
                ) : (
                  ''
                )}
                <div className="company-card-contact-info__map">
                  {company.general_data.contact_info.address_de_facto
                    .additional &&
                  company.general_data.contact_info.address_de_facto.additional
                    .lat &&
                  company.general_data.contact_info.address_de_facto.additional
                    .long ? (
                    <LoadScript googleMapsApiKey={process.env.MAP_KEY}>
                      <GoogleMap
                        mapContainerClassName="company-card-contact-info__google-map"
                        center={{
                          lat:
                            company.general_data.contact_info.address_de_facto
                              .additional.lat,
                          lng:
                            company.general_data.contact_info.address_de_facto
                              .additional.long
                        }}
                        zoom={16}
                      >
                        <Marker
                          position={{
                            lat:
                              company.general_data.contact_info.address_de_facto
                                .additional.lat,
                            lng:
                              company.general_data.contact_info.address_de_facto
                                .additional.long
                          }}
                          label={company.name}
                        />
                      </GoogleMap>
                    </LoadScript>
                  ) : (
                    <div className="no-map-data">
                      <h2>No Map Data</h2>
                      <img src="/geo.png" alt="" />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="company-turnover">
              <span>Company Turnover :</span>
              <span>
                {company.general_data
                  ? company.general_data.turnover.last
                  : null}
              </span>
            </div>
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

interface Querry {
  query: {
    slug: string;
  };
}

Company.getInitialProps = async (
  ctx: Querry
): Promise<{
  data: Data;
}> => {
  const x = ctx.query.slug;
  const data = await getCompany.request(x);
  return {
    data
  };
};

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { getCompany } from 'services/companies-services';
import { useRouter } from 'next/router';
import { Search } from 'ui/molecules/Search/Search';
import { Footer } from 'ui/molecules/Footer/Footer';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

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
  business_hours: {
    title: string;
    value: string;
  }[];
  contact_info: {
    emails: string;
    phones: string;
    faxes: string;
    sites: string;
    address_de_facto: {
      title: string;
      additional: {
        lat: number;
        long: number;
      };
    };
  };
  creation_date: string | string[] | null;
  description: string;
  idno: string;
  size: {
    name: string;
  };
  turnover: {
    last: number;
  };
  special_description: {
    id: number;
    title: string;
  };
}

export interface Company {
  turnover: number;
  idno: string | number | null | undefined;
  general_data: GeneralData;
  history: any;
  creation_year: number;
  email: boolean;
  employees: string;
  industry: string;
  location: string;
  mobile: boolean;
  name: string;
  phone: boolean;
  slug: string;
  website: string;
  partners: string[];
  status: {
    title: string;
  };
}

export interface Data {
  idno: string | number | null | undefined;
  data: GeneralData;
}

export const Company = () => {
  const [company, setCompany] = useState<Company>();

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
              <a className="company-container__nav-link" href="/search?slug=">
                Show all
              </a>
            </div>
          </div>
        </div>
        {company?.general_data ? (
          <div className="company-content">
            <div className="company-content__general">
              <div className="company-content__industry">
                <div className="company-content__image">
                  <img
                    src={
                      company?.general_data?.contact_info?.sites?.[0]
                        ? `https://account.globaldatabase.com/logo/${company?.general_data?.contact_info?.sites?.[0]?.substring(
                            7,
                            company?.general_data?.contact_info?.sites?.[0]
                              .length
                          )}/`
                        : '/placeholder.png'
                    }
                    alt=""
                  />
                </div>
                <div className="company-content__info">
                  <div className="company-content__name">
                    <span>{company?.name}</span>
                    <span>{company?.status?.title}</span>
                  </div>
                  <div className="company-content__area">
                    <span>
                      {company?.general_data?.special_description?.title}
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
                  {company?.general_data?.idno}
                </div>
              </div>
              <div className="company-content-data__card">
                <div className="company-content-data__card-header">
                  Registration year
                </div>
                <div className="company-content-data__card-content">
                  {company?.general_data?.creation_date}
                </div>
              </div>
              <div className="company-content-data__card">
                <div className="company-content-data__card-header">Staff</div>
                <div className="company-content-data__card-content">
                  {company?.general_data?.size?.name}
                </div>
              </div>
            </div>
            <div className="company-card-wrapper">
              <div className="company-card-wrapper__card">
                <div className="company-card-wrapper__card-header">
                  Company Profile
                </div>
                <div className="company-card-wrapper__card-content">
                  {company?.general_data?.description}
                </div>
              </div>
              <div className="company-card-wrapper__card">
                <div className="company-card-wrapper__card-header">
                  Workhours
                </div>
                <div className="company-card-wrapper__card-content">
                  {company?.general_data?.business_hours.map((hour) => (
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
                  ))}
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
                        {company?.general_data?.contact_info?.emails?.[0] ? (
                          <i className="far fa-envelope">Email</i>
                        ) : null}
                        {company?.general_data?.contact_info?.emails?.[0]
                          ? 'Email'
                          : null}
                      </span>
                    </div>
                    <div className="company-card-contact-info__phone">
                      <span>PHONE/CELL PHONE/FAX:</span>
                      <span>
                        {company?.general_data?.contact_info?.phones?.[0] ? (
                          <i className="fas fa-phone"></i>
                        ) : null}
                        {company?.general_data?.contact_info?.phones?.[0]
                          ? 'Phone'
                          : null}
                      </span>
                      <span>
                        {company?.general_data?.contact_info?.faxes?.[0] ? (
                          <i className="fas fa-fax"></i>
                        ) : null}
                        {company?.general_data?.contact_info?.faxes?.[0]
                          ? 'Fax'
                          : null}
                      </span>
                    </div>
                  </div>
                  <div className="company-card-contact-info__website">
                    <span>WEBSITE :</span>
                    <a href={company?.general_data?.contact_info?.sites?.[0]}>
                      <span>
                        {company?.general_data?.contact_info?.sites?.[0]}
                      </span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="company-card-contact-info__card google-maps-container">
                {company?.general_data?.contact_info?.address_de_facto
                  ?.title ? (
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
                  {company?.general_data?.contact_info?.address_de_facto
                    ?.additional?.long ? (
                    <LoadScript googleMapsApiKey={`${process.env.MAP_KEY}`}>
                      <GoogleMap
                        mapContainerClassName="company-card-contact-info__google-map"
                        center={{
                          lat: company.general_data.contact_info
                            .address_de_facto.additional.lat,
                          lng: company.general_data.contact_info
                            .address_de_facto.additional.long
                        }}
                        zoom={16}
                      >
                        <Marker
                          position={{
                            lat: company.general_data.contact_info
                              .address_de_facto.additional.lat,
                            lng: company.general_data.contact_info
                              .address_de_facto.additional.long
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
              <span>{company?.general_data?.turnover?.last}</span>
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

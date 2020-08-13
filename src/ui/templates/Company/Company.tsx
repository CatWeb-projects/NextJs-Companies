import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { getCompany } from 'services/companies-services';
import { useRouter } from 'next/router';
import { Search } from 'ui/molecules/Search/Search';
import { Footer } from 'ui/molecules/Footer/Footer';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

export const Company = ({ data }: any) => {
  const [company, setCompany] = useState<any>([]);
  const router = useRouter();

  useEffect(() => {
    const getCompanyInfo = async () => {
      if (router.query.slug) {
        try {
          const companyInfo = await getCompany(router.query.slug);
          console.log(companyInfo);
          setCompany(companyInfo);
        } catch (error) {
          // eslint-disable-next-line
          console.error(error);
        }
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
              <Search findings={data} />
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
                        : company.history[0].company_name
                      : ''
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
                {company.general_data ? company.general_data.description : null}
              </div>
            </div>
            <div className="company-card-wrapper__card">
              <div className="company-card-wrapper__card-header">Workhours</div>
              <div className="company-card-wrapper__card-content">
                {company.general_data
                  ? company.general_data.business_hours.map((hour: any) => (
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
                      <i className="far fa-envelope"></i>
                      {company.general_data
                        ? company.general_data.contact_info.emails[0]
                          ? 'Email'
                          : ''
                        : null}
                    </span>
                  </div>
                  <div className="company-card-contact-info__phone">
                    <span>PHONE/CELL PHONE/FAX:</span>
                    <span>
                      <i className="fas fa-phone"></i>
                      {company.general_data
                        ? company.general_data.contact_info.phones[0]
                          ? 'Phone'
                          : ''
                        : null}
                    </span>
                    <span>
                      <i className="fas fa-fax"></i>{' '}
                      {company.general_data
                        ? company.general_data.contact_info.faxes[0]
                          ? 'Fax'
                          : ''
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
              <div className="company-card-contact-info__info-map">
                <span>
                  <i className="fas fa-map-marker-alt"></i>
                  {company.general_data
                    ? company.general_data.contact_info.address_de_facto.title
                    : null}
                </span>
              </div>
              <div className="company-card-contact-info__map">
                {company.general_data ? (
                  <LoadScript googleMapsApiKey="AIzaSyC_0fh12-DVjt8WuY8llmg0Q7m14wRkDsg">
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
                      zoom={17}
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
                  <p>No Data for Map</p>
                )}
              </div>
            </div>
          </div>
          <div className="company-turnover">
            <span>Company Turnover :</span>
            <span>
              {company.general_data ? company.general_data.turnover.last : null}
            </span>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
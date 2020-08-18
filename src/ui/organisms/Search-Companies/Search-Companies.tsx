import React, { useState } from 'react';
import dayjs from 'dayjs';
import Link from 'next/link';
import { GeneralData } from 'ui/templates/Company/Company';

export interface PropsData {
  propsData: GeneralData;
}
export interface FindedCompany {
  creation_year: 2000;
  email: true;
  employees: '10-49';
  id: 1025;
  idno: '1003600038566';
  industry: 'Depozitarea și prelucrarea produselor agricole';
  location: 'or.Otaci';
  mobile: true;
  name: 'ULEINORD';
  parent_id: null;
  partners: ['COMPANIA TREZEME LIMITED '];
  phone: null;
  slug: 'uleinord';
  turnover: 39382000;
  website: nu;
}

export const SearchCompanies = ({ propsData }: PropsData) => {
  const years = (thisDay: number) => {
    let today = new Date();
    let dateTime = dayjs(today).format('YYYY');
    let result = parseFloat(dateTime) - thisDay;
    return result;
  };

  return (
    <>
      <div className="search-list-content">
        <div className="search-list-content__header">
          <div className="search-list-content__logo">
            <img
              src={
                propsData.website
                  ? `https://account.globaldatabase.com/logo/${propsData.website.substring(
                      7,
                      propsData.website.length
                    )}/`
                  : '/placeholder.png'
              }
              alt=""
            />
          </div>
          <div className="search-list-content__title">
            <Link href="/company/[slug]" as={`/company/${propsData.slug}`}>
              <a>{propsData.name}</a>
            </Link>
            {propsData.location ? (
              <span className="search-list-content__location">
                <i className="fas fa-map-marker-alt"></i>
                {propsData.location}
              </span>
            ) : (
              <span></span>
            )}
          </div>
        </div>
        <div className="search-list-content__first-column card-list">
          <div>
            IDNO:<span> {propsData.idno}</span>
          </div>
          <div>
            Status:<span className="first-column-active">ACTIV</span>
          </div>
          <div>
            Date of establishment:<span> {propsData.creation_year}</span>
          </div>
          <div>
            Vîrsta:<span> {years(propsData.creation_year)} years </span>
          </div>
        </div>
        <div className="search-list-content__second-column card-list">
          <div>
            Nr. by the employees:
            <span className="data_text">
              {' '}
              {propsData.employees ? propsData.employees : '---'}
            </span>
          </div>
          <div>
            Turn over:
            <span className="data_text">
              {' '}
              {propsData.turnover ? propsData.turnover : '---'} MDL
            </span>
          </div>
          <div>
            Industry:
            <span className="data_text">
              {' '}
              {propsData.industry ? propsData.industry : '---'}
            </span>
          </div>
        </div>
        <div className="search-list-content__third-column card-list">
          <div>Contacts:</div>
          <div>
            <span className={propsData.mobile ? 'phone_true' : 'phone_false'}>
              <i className="fas fa-mobile-alt i_first"></i>Phone mobile
            </span>
            <span className={propsData.phone ? 'tel_true' : 'tel_false'}>
              <i className="fas fa-phone"></i>Phone
            </span>
            <span className={propsData.email ? 'email_true' : 'email_false'}>
              <i className="far fa-envelope"></i>Email
            </span>
            <span
              className={propsData.website ? 'website_true' : 'website_false'}
            >
              <i className="fas fa-globe"></i>Website
            </span>
          </div>
        </div>
        <div className="search-list-content__footer">
          <span>
            Founders of the company:{' '}
            <strong>
              {propsData
                ? propsData.partners.map((partner: any) => `${partner}, `)
                : null}
            </strong>
          </span>
        </div>
      </div>
    </>
  );
};

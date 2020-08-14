import React from 'react';
import dayjs from 'dayjs';

export const SearchCompanies = () => {
  const years = (x: number) => {
    let today = new Date();
    let dateTime = dayjs(today).format('YYYY');
    let result = parseFloat(dateTime) - x;
    return result;
  };
  return (
    <>
      <div className="search-list-content">
        <div className="search-list-content_data">
          <i className="fas fa-filter"></i> {} <i className="fas fa-times"></i>
        </div>
        <div className="search-list-content_results">
          {/* <i className="fas fa-suitcase-rolling"></i> {companyList.length} of
          results */}
        </div>
        <div
        // className={
        //   companyList.length === 0 ? 'no_result_false' : 'no_result_true'
        // }
        >
          <i className="fas fa-folder-open"></i>
        </div>
        {/* {searchList && companyList ? (
            companyList.map((item: Company) => (
              <div className="search_list__item" key={item.idno}>
                <div className="company_logo">
                  <img
                    src={
                      item.website
                        ? `https://account.globaldatabase.com/logo/${item.website.substring(
                            7,
                            item.website.length
                          )}/`
                        : '/no_img.png'
                    }
                    alt=""
                  />
                </div>
                <div className="company_title">
                  {item.name}
                  {item.location ? (
                    <p className="company_location">
                      <img src="/pin.png" alt="geo_point" />
                      {item.location}
                    </p>
                  ) : (
                    <p></p>
                  )}
                </div>
                <div className="list_item__first_column">
                  <p>
                    IDNO: <span className="data_text">{item.idno}</span>
                  </p>
                  <p>
                    Status: <span className="company_activ">ACTIV</span>
                  </p>
                  <p>
                    Date of establishment:{' '}
                    <span className="data_text">{item.creation_year}</span>
                  </p>
                  <p>
                    Vărsta:{' '}
                    <span className="data_text">
                      {years(item.creation_year)} years
                    </span>
                  </p>
                </div>
                <div className="list_item__second_column">
                  <p>
                    Nr. by the employees:{' '}
                    <span className="data_text">
                      {item.employees ? item.employees : '---'}
                    </span>
                  </p>
                  <p>
                    Turn over:{' '}
                    <span className="data_text">
                      {item.turnover ? item.turnover : '---'} MDL
                    </span>
                  </p>
                  <p>
                    Industry:{' '}
                    <span className="data_text">
                      {item.industry ? item.industry : '---'}
                    </span>
                  </p>
                </div>
                <div className="list_item__third_column">
                  <p>Contacts:</p>
                  <ul>
                    <li className={item.mobile ? 'phone_true' : 'phone_false'}>
                      <i className="fas fa-mobile-alt i_first"></i>Phone mobile
                    </li>
                    <li className={item.phone ? 'tel_true' : 'tel_false'}>
                      <i className="fas fa-phone"></i>Phone
                    </li>
                    <li className={item.email ? 'email_true' : 'email_false'}>
                      <i className="far fa-envelope"></i>Email
                    </li>
                    <li
                      className={
                        item.website ? 'website_true' : 'website_false'
                      }
                    >
                      <i className="fas fa-globe"></i>Website
                    </li>
                  </ul>
                </div>
              </div>
            ))
          ) : (
            <div className="loader_list">
              <img src="/loader.gif" alt="" />
            </div>
          )}
        </div>
      ) : (
        <></>
      )} */}
      </div>
    </>
  );
};

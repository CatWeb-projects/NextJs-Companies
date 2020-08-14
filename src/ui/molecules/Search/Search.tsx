import React, { useState, useEffect } from 'react';
import { Findings } from 'index';
import Link from 'next/link';
import {
  getCompanies,
  getAllCompanies,
  listCompanies
} from 'services/companies-services';

interface Props {
  findings: Findings[];
}

export const Search = ({ findings }: Props) => {
  const [searchCompaniesData, setSearchCompaniesData] = useState<
    Findings[] | null
  >(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const [allCompanies, setAllCompanies] = useState<Findings[]>([]);
  const [searchList, setSearchList] = useState<string>('');
  const [companyList, setCompanyList] = useState<Findings[]>([]);

  useEffect(() => {
    const getCompaniesData = async () => {
      try {
        const saveData = await getAllCompanies.request();
        setAllCompanies(saveData);
        console.log(saveData);
      } catch (error) {
        console.log(error);
      }
    };
    getCompaniesData();
    return () => {
      getAllCompanies.cancel();
    };
  }, []);

  useEffect(() => {
    const getData = async () => {
      if (searchValue) {
        try {
          const saveData = await getCompanies.request(searchValue);
          setSearchCompaniesData(saveData);
        } catch (error) {
          // eslint-disable-next-line
          console.log(error);
        }
      } else {
        setSearchCompaniesData(null);
        setSearchValue('');
      }
    };
    getData();
    return () => {
      getCompanies.cancel();
    };
  }, [searchValue]);

  useEffect(() => {
    if (searchValue === '' || searchCompaniesData?.length === 0) {
      setSearchCompaniesData(null);
    } else {
      setSearchCompaniesData(searchCompaniesData);
    }
  }, [searchCompaniesData]);

  const searchCompanies = (e: any) => {
    e.preventDefault();
    setSearchValue(e.target.value);
  };

  const dataStyle = {
    width: '100%',
    borderBottomLeftRadius: '20px',
    borderBottomRightRadius: '20px',
    border: '1px solid #467bbc'
  };

  const searchStyle = {
    borderBottomLeftRadius: '0',
    borderBottomRightRadius: '0'
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const saveData = await listCompanies.request(searchList);
        setCompanyList(saveData.data);
      } catch (error) {
        // eslint-disable-next-line
        // console.log(error);
      }
    };
    getData();

    return () => {
      listCompanies.cancel();
    };
  }, [searchValue]);

  const addSubmit = (e: any) => {
    e.preventDefault();
    setSearchList(searchValue);
    setSearchValue('');
    console.log(companyList);
    // router.push('')
  };

  return (
    <>
      <div className="search-container__search-area">
        <form onSubmit={addSubmit}>
          <input
            value={searchValue}
            style={searchCompaniesData ? searchStyle : undefined}
            type="text"
            placeholder={`Search from 100 companies`}
            onChange={searchCompanies}
          />
          <i className="fas fa-search"></i>
        </form>
      </div>
      <div
        className="finded-container company-small-finded"
        style={searchCompaniesData ? dataStyle : undefined}
      >
        {searchCompaniesData &&
          searchCompaniesData.map((company: any) => (
            <Link
              key={company.idno}
              href="/company/[slug]"
              as={`/company/${company.slug}`}
            >
              <div className="finded">
                <a>{`${company.name} • ${company.idno}`}</a>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
};

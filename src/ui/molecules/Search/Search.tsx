import React, { useState, useEffect } from 'react';
import { Findings } from 'index';
import Link from 'next/link';
import { getCompanies } from 'services/companies-services';

interface Props {
  findings: Findings[];
}

export const Search = ({ findings }: Props) => {
  const [data, setData] = useState<Findings[] | null>(null);
  const [searchValue, setSearchValue] = useState<string>('');

  const getCompaniesList = async (name: string) => {
    try {
      const res = await getCompanies(name);
      console.log(res);
      setData(res);
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
    }
  };

  useEffect(() => {
    if (searchValue === '') {
      setData(null);
    } else {
      setData(data);
    }
  }, [data]);

  const searchCompanies = (e: any) => {
    getCompaniesList(e.target.value);
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

  return (
    <>
      <div className="search-container__search-area">
        <input
          value={searchValue}
          style={data ? searchStyle : undefined}
          type="text"
          placeholder="Search from 226 515 companies"
          onChange={searchCompanies}
        />
        <i className="fas fa-search"></i>
      </div>
      <div className="finded-container" style={data ? dataStyle : undefined}>
        {data &&
          data.map((company: any) => (
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

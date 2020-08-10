import React, { useState, useEffect } from 'react';
import { Findings } from 'index';
import Link from 'next/link';
import { getCompanies } from 'services/companies-services';

interface Props {
  findings: Findings[];
}

export const Search = ({ findings }: Props) => {
  const [data, setData] = useState<Findings[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');

  const getCompaniesList = async (name: string) => {
    try {
      const res = await getCompanies(name);
      setData(res);
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
    }
  };

  useEffect(() => {
    if (name) {
      data;
    } else {
      setData([]);
    }
  }, []);

  console.log(data);

  const searchCompanies = (e: any) => {
    getCompaniesList(e.target.value);
    setSearchValue(e.target.value);
  };

  return (
    <>
      <div className="search-container__search-area">
        <input
          value={searchValue}
          type="text"
          placeholder="Search from 226.515 companies"
          onChange={searchCompanies}
        />
        <i className="fas fa-search"></i>
      </div>
      <div className="finded-container">
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

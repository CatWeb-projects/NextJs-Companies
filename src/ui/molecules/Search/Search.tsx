import React, { useState, useEffect } from 'react';
import { Findings } from 'index';
import Link from 'next/link';
import { getCompanies } from 'services/companies-services';
import { useRouter } from 'next/router';

export const Search = () => {
  const [searchCompaniesData, setSearchCompaniesData] = useState<
    Findings[] | null
  >(null);
  const [searchValue, setSearchValue] = useState<string>('');

  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      if (searchValue) {
        try {
          const saveData = await getCompanies.request(searchValue);
          setSearchCompaniesData(saveData);
        } catch (error) {}
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

  const searchCompanies = (e: {
    preventDefault: () => void;
    target: { value: React.SetStateAction<string> };
  }) => {
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

  const addSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setSearchValue('');
    router.push(`/search/?slug=${searchValue}`);
  };

  const resetInput = () => {
    setSearchValue('');
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
          searchCompaniesData.map((company: Findings) => (
            <Link
              key={company.idno}
              href="/company/[slug]"
              as={`/company/${company.slug}`}
            >
              <div className="finded" onClick={resetInput}>
                <a>{`${company.name} • ${company.idno}`}</a>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
};

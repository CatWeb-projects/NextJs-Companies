import React, { useState, useEffect } from 'react';
import { getCompanies } from 'services/companies-services';
import { Company } from 'ui/molecules/Company/Company';

export const CompaniesList = () => {
  const [companies, setCompanies] = useState<any>([]);
  const [loading, setLoading] = useState<any>(true);

  useEffect(() => {
    const getData = async () => {
      const savedData = await getCompanies();
      setCompanies(savedData.data);
      setLoading(false);
      console.log(savedData);
    };
    getData();
  }, [setCompanies]);

  return (
    <div className="main-container">
      {loading && <div className="loading">Loading...</div>}
      {companies && companies.map((item: any) => <Company key={item.id} />)}
    </div>
  );
};

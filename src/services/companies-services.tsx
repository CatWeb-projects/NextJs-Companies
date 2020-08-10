import axios from 'axios';
import { Findings } from 'index';

const baseUrl = 'https://app.informer.md/api/public/';

export const getCompanies = (name: string | null): Promise<Findings[]> => {
  if (name) {
    return axios
      .get(`${baseUrl}search?per_page=5&company_name=${name}`)
      .then((res) => res.data.data);
  }
  return axios
    .get(`${baseUrl}search?per_page=100`)
    .then((res) => res.data.data);
};

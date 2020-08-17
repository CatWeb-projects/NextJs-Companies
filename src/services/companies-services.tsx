import axios from 'axios';
import { Findings } from 'index';

const { CancelToken } = axios;

const baseUrl = 'https://app.informer.md/api/public/';
export const getAllCompanies = {
  cancel: () => {},
  request: () =>
    axios
      .get(`${baseUrl}search?per_page=100`, {
        cancelToken: new CancelToken((c) => (getAllCompanies.cancel = c))
      })
      .then((res) => res.data.data)
};

export const getCompanies = {
  cancel: () => {},
  request: (name: string) =>
    axios
      .get(`${baseUrl}search?per_page=5&company_name=${name}`, {
        cancelToken: new CancelToken((c) => (getAllCompanies.cancel = c))
      })
      .then((res) => res.data.data)
};

export const listCompanies = {
  cancel: () => {},
  request: (name: string | string[]) =>
    axios
      .get(
        `https://app.informer.md/api/public/search?page=1&per_page=25&company_name=${name}`,
        {
          cancelToken: new CancelToken((c) => (listCompanies.cancel = c))
        }
      )
      .then((response) => response.data)
};

export const getCompany = {
  cancel: () => {},
  request: (name: string | string[]) =>
    axios
      .get(`${baseUrl}company?slug=${name}`, {
        cancelToken: new CancelToken((c) => (getCompany.cancel = c))
      })
      .then((res) => res.data)
};

import axios from 'axios';

// const {cancelToken} = axios;
export const getCompanies = () => {
  return axios
    .get('https://app.informer.md/api/public/search?per_page=50&page=1')
    .then((res) => res.data);
};

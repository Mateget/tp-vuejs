import axios from 'axios';

const api = axios.create({
  baseURL: 'http://lakartxela.iutbayonne.univ-pau.fr/~mgethen/plop/public/',
});

export default api;

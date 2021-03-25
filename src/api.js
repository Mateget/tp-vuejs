import axios from 'axios';



const api = axios.create({
  baseURL: 'https://www.iutbayonne.univ-pau.fr/~klevron/api',
  //baseURL: 'http://lakartxela.iutbayonne.univ-pau.fr/~mgethen/plop/public/',
});

export default api;

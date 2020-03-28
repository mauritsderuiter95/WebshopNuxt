import axios from 'axios';
import https from 'https';
import Product from '../models/Product';

if (process.env.NODE_ENV !== 'production') {
  axios.defaults.baseURL = 'https://localhost:5001/api/products';
} else {
  axios.defaults.baseURL = 'https://backend.wrautomaten.nl/api/products';
}

const agent = new https.Agent({
  rejectUnauthorized: false,
});

export default class ProductService {
  static getProducts(category: string | null) {
    if (category !== undefined) { return axios.get(`?category=${category}`, { httpsAgent: agent }); }
    return axios.get('/', { httpsAgent: agent });
  }

  static getCategories() {
    return axios.get('/categories', { httpsAgent: agent });
  }

  static getProduct(product: Product) {
    return axios.get(`/${product.id}`, { httpsAgent: agent });
  }

  static postProduct(product: Product) {
    return axios.post('/', product);
  }

  static putProduct(product: Product) {
    return axios.put(`/${product.id}`, product);
  }

  static deleteProduct(product: Product) {
    return axios.delete(`/${product.id}`);
  }
}

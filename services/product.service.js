import axios from 'axios';
import https from 'https';

axios.defaults.baseURL = 'https://localhost:44337/api/products';

const agent = new https.Agent({  
    rejectUnauthorized: false
  })

class ProductService {
    getProducts(category) {
        if(category != undefined)
            return axios.get(`?category=${category}`, { httpsAgent: agent });
        else
            return axios.get(`/`, { httpsAgent: agent });
    }
    getCategories() {
        return axios.get(`/categories`, { httpsAgent: agent});
    }
    getProduct(productId) {
        return axios.get(`/${productId}`, { httpsAgent: agent });
    }
    postProduct(product) {
        return axios.post(`/`, product);
    }
    putProduct(product) {
        return axios.put(`/${product.id}`, product);
    }
    deleteProduct(product) {
        return axios.delete(`/${product.id}`);
    }
}

export default new ProductService();

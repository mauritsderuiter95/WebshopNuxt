import axios from 'axios';
import https from 'https';

const api = 'https://localhost:44337/api/products';

const agent = new https.Agent({  
    rejectUnauthorized: false
  })

class ProductService {
    getProducts() {
        return axios.get(`${api}`, { httpsAgent: agent });
    }
    getProduct(productId) {
        return axios.get(`${api}/${productId}`, { httpsAgent: agent });
    }
    postProduct(product) {
        return axios.post(`${api}`, product);
    }
    putProduct(product) {
        return axios.put(`${api}/${product.id}`, product);
    }
    deleteProduct(product) {
        return axios.delete(`${api}/${product.id}`);
    }
}

export default new ProductService();

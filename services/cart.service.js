/* eslint-disable class-methods-use-this */
import axios from 'axios';
import Cart from '../models/Cart';

const api = 'https://backend.wrautomaten.nl/api/carts';

class CartService {
  editCart(product) {
    if (localStorage.cart) {
      const cart = JSON.parse(localStorage.cart);
      cart.products.push(product.id);
      localStorage.cart = JSON.parse(cart);
      return axios.put(`${api}/${cart.id}`, cart);
    }

    const newCart = new Cart();
    if (newCart.products === undefined) {
      newCart.products = [];
    }
    newCart.products.push(product.id);
    return axios.post(`${api}`, newCart).then((response) => {
      localStorage.cart = JSON.stringify(response.data);
    });
  }

  deleteCart() {
    const { cart } = localStorage;
    return axios.delete(`${api}/${cart.id}`).then(localStorage.removeItem(cart));
  }

  getCart() {
    if (localStorage.cart) {
      return JSON.parse(localStorage.cart);
    }
    return null;
  }

  getItemCount(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    if (localStorage.cart) {
      return JSON.parse(localStorage.cart).products.length;
    }

    return 0;
  }
}

export default new CartService();

import axios from 'axios';
import Cart from '~/models/Cart.js';
import store from '~/store';

const api = 'https://backend.wrautomaten.nl/api/carts';

class CartService {
    editCart(product) {
        if(localStorage.cart) {
            var cart = JSON.parse(localStorage.cart);
            cart.products.push(product.id);
            localStorage.cart = JSON.parse(cart);
            return axios.put(`${api}/${ cart.id }`, cart);
        }
        else {
            var newCart = new Cart();
            if(newCart.products == undefined) {
                newCart.products = [];
            }
            newCart.products.push(product.id);
            return axios.post(`${api}`, newCart).then((response) => (localStorage.cart = JSON.stringify(response.data)));
        }
    }
    deleteCart() {
        var cart = localStorage.cart;
        return axios.delete(`${api}/${cart.id}`).then(localStorage.removeItem(cart));
    }
    getCart() {
        if(localStorage.cart) {
            return JSON.parse(localStorage.cart);
        }
    }
    getItemCount(token) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        if(localStorage.cart) {
            return JSON.parse(localStorage.cart).products.length;
        }
        else {
            return 0;
        }
    }
}

export default new CartService();

import Vuex from "vuex";
import Cookie from "js-cookie";
import CartModule from './modules/cart';
import UserModule from './modules/user';

const api = 'https://localhost:44337/api/carts';

const actions = {
  async nuxtServerInit ({ commit }, { req }) {
    let cartCookie;
    // Check if there's a cookie available
    if(req.headers.cookie) {
        cartCookie = req.headers.cookie
        .split(";")
        .find(c => c.trim().startsWith("Cart="));
        // Check if there's a cookie for the cart
        if(cartCookie)
            cartCookie = cartCookie.split("=");
        else
            cartCookie = null;
    }
    // Check if the cart cookie is set
    if(cartCookie) {
        // Check if the cart cookie isn't empty
        if(cartCookie[1] != 'undefined') {
            let cartId = cartCookie[1];
            // Get the cart from the backend
            await this.$axios.get(`${api}/${cartId}`)
            .then((response) => {
                let cart = response.data;
                // Set the cart in the state
                commit("cart/setCart", cart);
            });
        }
    }
    else {
        // Clear the cart in the state
        await commit("cart/clearCart");
    }
  }
};

const modules = {
  cart: CartModule,
  user: UserModule
};

export default {
  namespaced: true,
  actions,
  modules
};
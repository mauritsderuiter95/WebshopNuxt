import Vuex from "vuex";
import Cookie from "js-cookie";
import CartModule from './modules/cart';
import UserModule from './modules/user';

const api = 'https://localhost:44337/api/carts';

const actions = {
  async nuxtServerInit ({ commit, dispatch }, { req }) {
    await dispatch("user/initAuth", req);
    await dispatch("cart/getCart", req);
  }
};

const modules = {
  cart: CartModule,
  user: UserModule,
};

export default {
  namespaced: true,
  actions,
  modules
};

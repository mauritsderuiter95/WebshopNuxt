import CartModule from './modules/cart';
import UserModule from './modules/user';

const actions = {
  async nuxtServerInit({ dispatch }, { req }) {
    await dispatch('user/initAuth', req);
    await dispatch('cart/getCart', req);
  },
};

const modules = {
  cart: CartModule,
  user: UserModule,
};

export default {
  namespaced: true,
  actions,
  modules,
};

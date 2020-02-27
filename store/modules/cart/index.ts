/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import Cookie from 'js-cookie';
import Cart from '../../../models/Cart';
import Product from '../../../models/Product';
import CartProduct from '../../../models/CartProduct';

let api = '';
if (process.env.NODE_ENV !== 'production') {
  api = 'https://localhost:44337/api/carts';
} else {
  api = 'https://backend.wrautomaten.nl/api/carts';
}

const state = () => ({
  currentCart: {},
});

const mutations = ({
  setCart(state: any, cart: Cart) {
    state.currentCart = cart;
  },
  clearCart(state: any) {
    state.currentCart = null;
  },
});

const actions = {
  addToCart({ commit }: any, product: Product) {
    const cartProduct = new CartProduct(product.id,
      product.productName,
      product.price,
      1,
      product.photo);
    if ((this as any).state.cart.currentCart) {
      (this as any).$axios
        .$patch(
          `${api}/${(this as any).state.cart.currentCart.id}`,
          cartProduct,
        )
        .then((response: any) => {
          Cookie.set('Cart', response.id, { expires: 365 });
          commit('setCart', response);
        });
    } else {
      (this as any).$axios.$post(`${api}`, cartProduct).then((response: any) => {
        Cookie.set('Cart', response.id, { expires: 365 });
        commit('setCart', response);
      });
    }
  },
  editCart({ commit }: any, cart: Cart) {
    if ((this as any).state.cart.currentCart) {
      (this as any).$axios
        .$put(`${api}/${(this as any).state.cart.currentCart.id}`, cart)
        .then((response: any) => {
          Cookie.set('Cart', response.id, { expires: 365 });
          commit('setCart', response);
        });
    }
  },
  deleteCart({ commit }: any, req:any) {
    const cartCookie = req.headers.cookie
      .split(';')
      .find((c: string) => c.trim().startsWith('Cart='))
      .split('=');

    let cart;
    if (cartCookie) {
      cart = JSON.parse(cartCookie[1]);
    }
    (this as any).$axios
      .$delete(`${api}/${cart.id}`)
      .then(Cookie.remove('Cart'))
      .then(commit('clearCart'));
  },
  async getCart({ commit }: any, req: any) {
    let cartCookie;
    // Check if there's a cookie available
    if (req.headers.cookie) {
      cartCookie = req.headers.cookie
        .split(';')
        .find((c: string) => c.trim().startsWith('Cart='));
      // Check if there's a cookie for the cart
      if (cartCookie) { cartCookie = cartCookie.split('='); } else { cartCookie = null; }
    }
    // Check if the cart cookie is set
    if (cartCookie) {
      // Check if the cart cookie isn't empty
      if (cartCookie[1] !== 'undefined') {
        const cartId = cartCookie[1];
        // Get the cart from the backend
        await (this as any)
          .$axios.get(`${api}/${cartId}`)
          .then((response: any) => {
            const cart = response.data;
            // Set the cart in the state
            commit('setCart', cart);
          })
          .catch(() => {
            commit('clearCart');
          });
      }
    } else {
      // Clear the cart in the state
      await commit('clearCart');
    }
  },
};

const getters = {
  currentCart(state: any) {
    return state.currentCart;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

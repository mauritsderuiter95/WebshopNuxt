import Vuex from "vuex";
import Cookie from "js-cookie";
import CartModule from './modules/cart';

const state = () => ({
      token: null
});

const mutations = () => ({
      setToken(state, token) {
        state.token = token;
      },
      clearToken(state) {
        state.token = null;
      }
});

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
},
  authenticateUser({commit}, authData){
    let authUrl =
      "https://localhost:44337/api/users/authenticate";
    if (!authData.isLogin) {
      authUrl =
        "https://localhost:44337/api/users";
    }
    return this.$axios
      .$post(authUrl, {
        userName: authData.username,
        password: authData.password
      })
      .then(result => {
        commit("setToken", result.idToken);
        Cookie.set("jwt", result.idToken);
        Cookie.set(
          "expirationDate",
          new Date().getTime() + Number.parseInt(result.expiresIn) * 1000
        );
      })
      .catch(e => console.log(e));
  },
  initAuth({commit, dispatch}, req) {
    let token;
    let expirationDate;
    if (req) { 
      if (!req.headers.cookie) {
        return;
      }
      const jwtCookie = req.headers.cookie
        .split(";")
        .find(c => c.trim().startsWith("jwt="));
      if (!jwtCookie) {
        return;
      }
      token = jwtCookie.split("=")[1];
      expirationDate = req.headers.cookie
        .split(";")
        .find(c => c.trim().startsWith("expirationDate="))
        .split("=")[1];
    }
    if (new Date().getTime() > +expirationDate || !token) {
      console.log("No token or invalid token");
      dispatch("logout");
      return;
    }
    commit("setToken", token);
  },
  logout({commit}) {
    commit("clearToken");
    Cookie.remove("jwt");
    Cookie.remove("expirationDate");
  }
};

const getters = {
  isAuthenticated(state) {
    return state.token != null;
  }
};

const modules = {
  cart: CartModule
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
  modules
};
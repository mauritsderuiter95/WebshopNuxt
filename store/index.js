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

const actions = {
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
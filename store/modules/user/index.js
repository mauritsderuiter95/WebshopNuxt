import Vuex from "vuex";
import Cookie from "js-cookie";
import { Promise } from "q";

const state = () => ({
      token: null
});

const mutations = ({
      setToken(state, token) {
        state.token = token;
      },
      clearToken(state) {
        state.token = null;
      }
});

const actions = {
  authenticateUser({commit}, authData){
      return new Promise((resolve, reject) => {
        let authUrl = "https://localhost:44337/api/users/authenticate";
        if (!authData.isLogin) {
            authUrl = "https://localhost:44337/api/users";
        }
        return this.$axios
        .$post(authUrl, {
            userName: authData.username,
            password: authData.password
        })
        .then(result => {
            commit("setToken", result.token);
            Cookie.set("jwt", result.token);
            Cookie.set(
            "expirationDate",
            result.expires
            );
            resolve();
        })
        .catch(e => reject(e));
      });
  },
  async initAuth({commit, dispatch}, req) {
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
    if (new Date().getTime() > + expirationDate || !token) {
      await dispatch("logout");
      return;
    }
    await commit("setToken", token);
  },
  logout({commit}) {
    commit("clearToken");
    Cookie.remove("jwt");
    Cookie.remove("expirationDate");
  }
};

const getters = {
  isAuthenticated(state) {
    console.log(state.token)
    return state.token != null;
  }
};


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
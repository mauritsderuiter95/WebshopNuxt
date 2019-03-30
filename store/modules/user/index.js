import Vuex from "vuex";
import Cookie from "js-cookie";
import { Promise } from "q";

const state = () => ({
      user: null
});

const mutations = ({
      setUser(state, user) {
        state.user = user;
      },
      clearUser(state) {
        state.user = null;
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
          commit("setUser", result);
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
    let userUrl = "https://localhost:44337/api/users/currentuser";
    await this.$axios
    .$post(userUrl)
    .then(result => {
      commit("setUser", result);
    })
    .catch(() => {
      commit("clearUser");
    });
  },
  logout({commit}) {
    commit("clearUser");
    Cookie.remove("jwt");
    Cookie.remove("expirationDate");
  }
};

const getters = {
  isAuthenticated(state) {
    return state.user.token != null;
  },
  currentUser(state) {
    return state.user;
  }
};


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
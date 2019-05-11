import Vuex from "vuex";
import Cookie from "js-cookie";
import { Promise } from "q";

const state = () => ({
      user: null,
      token: null
});

const mutations = ({
      setToken(state, token) {
        state.token = token;
      },
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
          commit("setToken", result.token);
          Cookie.set("jwt", result.token, { expires: 365 });
          Cookie.set(
          "expirationDate",
          result.expires,
          { expires: 365 }
          );
          resolve();
      })
      .catch(e => reject(e));
    });
  },
  async initAuth({state, commit, dispatch}, req) {
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
    commit("setToken", token);
    let userUrl = "https://localhost:44337/api/users/currentuser";
    this.$axios.onRequest(config => {
      config.headers.common['Authorization'] = `Bearer ${state.token}`;
    });
    await this.$axios
    .$get(userUrl)
    .then(result => {
      commit("setUser", result);
    })
    .catch((e) => {
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
      return state.token != null && state.user != null;
  },
  currentUser(state) {
    return state.user;
  },
  token(state) {
    return state.token;
  }
};


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

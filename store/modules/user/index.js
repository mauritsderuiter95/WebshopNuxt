import Vuex from "vuex";
import Cookie from "js-cookie";
import { Promise } from "q";

const api = 'https://backend.wrautomaten.nl/api/users';
//const api = 'https://localhost:44337/api/users';

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
        state.token = null;
      }
});

const actions = {
  authenticateUser({commit}, authData){
    return new Promise((resolve, reject) => {
      let authUrl = `${ api }/authenticate`;
      if (!authData.isLogin) {
          authUrl = api;
      }
      return this.$axios
      .$post(authUrl, {
          userName: authData.username,
          password: authData.password
      })
      .then(result => {
          commit("setUser", result);
          commit("setToken", result.token);
          Cookie.set("jwt", result.token, { expires: 7 });
          Cookie.set(
          "expirationDate",
          result.expires,
          { expires: 7 }
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
        const guestCookie = req.headers.cookie
          .split(";")
          .find(c => c.trim().startsWith("guest"));

          if(!guestCookie)
            return;

          let user = JSON.parse(decodeURIComponent(guestCookie.split('=')[1]));
          commit('setUser', user);
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
    let userUrl = `${ api }/currentuser`;
    await this.$axios
    .$get(userUrl)
    .then(result => {
      commit("setUser", result);
    })
    .catch((e) => {
      commit("clearUser");
    });
  },
  setUser({commit}, user) {
    commit("setUser", user);
  },
  logout({commit}) {
    commit("clearUser");
    Cookie.remove("jwt");
    Cookie.remove("expirationDate");
  },
  saveGuest({commit}, user) {
    commit("setUser", user);
    Cookie.set("guest", user, { expires: 7 });
  }
};

const getters = {
  isAuthenticated(state) {
      return state.token != null;
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

/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import Cookie from 'js-cookie';
import User from '../../../models/User';

const api = 'https://backend.wrautomaten.nl/api/users';
// const api = 'https://localhost:44337/api/users';

const state = () => ({
  user: null,
  token: null,
});

const mutations = ({
  setToken(state: any, token: string) {
    state.token = token;
  },
  setUser(state: any, user: User) {
    state.user = user;
  },
  clearUser(state: any) {
    state.user = null;
    state.token = null;
  },
});

const actions = {
  authenticateUser({ commit }:any, authData: any): any {
    return new Promise((resolve, reject) => {
      let authUrl = `${api}/authenticate`;
      if (!authData.isLogin) {
        authUrl = api;
      }
      return (this as any).$axios
        .$post(authUrl, {
          userName: authData.username,
          password: authData.password,
        })
        .then((result: any) => {
          commit('setUser', result);
          commit('setToken', result.token);
          Cookie.set('jwt', result.token, { expires: 7 });
          Cookie.set(
            'expirationDate',
            result.expires,
            { expires: 7 },
          );
          resolve();
        })
        .catch((e: any) => reject(e));
    });
  },
  async initAuth({ commit, dispatch }: any, req: any) {
    let token;
    let expirationDate;
    if (req) {
      if (!req.headers.cookie) {
        return;
      }
      const jwtCookie = req.headers.cookie
        .split(';')
        .find((c: string) => c.trim().startsWith('jwt='));

      if (!jwtCookie) {
        let guestCookie = req.headers.cookie
          .split(';')
          .find((c: string) => c.trim().startsWith('guest='));

        if (!guestCookie) { return; }

        const guestArr = guestCookie.split('=');
        guestCookie = guestCookie.replace(`${guestArr[0]}=`, '');

        const user = JSON.parse(decodeURIComponent(guestCookie));
        commit('setUser', user);
        return;
      }

      const tokenArr = jwtCookie.split('=');
      [, token] = tokenArr;

      const expirationDateArr = req.headers.cookie
        .split(';')
        .find((c: string) => c.trim().startsWith('expirationDate='))
        .split('=');

      [, expirationDate] = expirationDateArr;
    }
    if (new Date().getTime() > +expirationDate || !token) {
      await dispatch('logout');
      return;
    }
    commit('setToken', token);
    const userUrl = `${api}/currentuser`;
    await (this as any).$axios
      .$get(userUrl)
      .then((result: User) => {
        commit('setUser', result);
      })
      .catch(() => {
        commit('clearUser');
      });
  },
  setUser({ commit }: any, user: User) {
    commit('setUser', user);
  },
  logout({ commit }: any) {
    commit('clearUser');
    Cookie.remove('jwt');
    Cookie.remove('expirationDate');
  },
  saveGuest({ commit }: any, user: User) {
    commit('setUser', user);
    Cookie.set('guest', user, { expires: 7 });
  },
};

const getters = {
  isAuthenticated(state: any) {
    return state.token != null;
  },
  currentUser(state: any) {
    return state.user;
  },
  token(state: any) {
    return state.token;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

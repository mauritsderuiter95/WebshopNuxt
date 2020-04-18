/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import Cookie from 'js-cookie';
import User from '../../../models/User';

let api = '';
if (process.env.NODE_ENV !== 'production') {
  api = 'https://localhost:5001/api/users';
} else {
  api = 'https://backend.wrautomaten.nl/api/users';
}

interface IUserState {
  user: User | null,
  token: string | null,
  showCallback: boolean,
}

const state = () : IUserState => ({
  user: null,
  token: null,
  showCallback: true,
});

const mutations = ({
  setToken(state: IUserState, token: string) {
    state.token = token;
  },
  setUser(state: IUserState, user: User) {
    state.user = user;
  },
  clearUser(state: IUserState) {
    state.user = null;
    state.token = null;
  },
  showCallback(state : IUserState, showCallback: boolean) {
    state.showCallback = showCallback;
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
  initCallback({ commit }: any, req: any) {
    if (!req) return;

    if (!req.headers.cookie) return;

    let showCallback = req.headers.cookie
      .split(';')
      .find((c: string) => c.trim().startsWith('showCallback='));

    if (!showCallback) return;

    [, showCallback] = showCallback.split('=');

    showCallback = showCallback === 'true';

    commit('showCallback', showCallback);
  },
  showCallback({ commit }: any, showCallback: boolean) {
    commit('showCallback', showCallback);
    Cookie.set('showCallback', String(showCallback));
  },
};

const getters = {
  isAuthenticated(state: IUserState) {
    return state.token != null;
  },
  currentUser(state: IUserState) {
    return state.user;
  },
  token(state: IUserState) {
    return state.token;
  },
  showCallback(state: IUserState) {
    return state.showCallback;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

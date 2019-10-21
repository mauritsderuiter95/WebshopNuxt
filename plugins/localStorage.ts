import createPersistedState from 'vuex-persistedstate';

export default ({ store } : any) => {
  createPersistedState({
    key: 'clientkey',
    paths: [],
  })(store);
};

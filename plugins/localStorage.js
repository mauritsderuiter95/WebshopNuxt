import createPersistedState from 'vuex-persistedstate';
 
export default ({store}) => {
  createPersistedState({
      key: 'clientkey',
      paths: []
  })(store)
}
/* eslint-disable no-param-reassign */
import https from 'https';

export default function ({ $axios, store } : any) {
  $axios.onRequest((config : any) => {
    if (store.getters['user/token']) {
      config.headers.common.Authorization = `Bearer ${store.getters['user/token']}`;
    }
    config.headers.common['Content-Type'] = 'application/json';
  });
  $axios.defaults.httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });
}

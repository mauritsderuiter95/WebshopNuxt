import https from 'https';

export default function({ $axios, store }) {
    $axios.onRequest(config => {
        if (store.getters['user/token']) {
            config.headers.common['Authorization'] = `Bearer ${store.getters['user/token']}`;
        }
        config.headers.common['Content-Type'] = 'application/json';
    });
    $axios.defaults.httpsAgent = new https.Agent({
        rejectUnauthorized: false
    });
}

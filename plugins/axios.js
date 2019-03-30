import https from 'https';

export default function ({ $axios, store }) {
    $axios.onRequest(config => {
        //console.log(store.state['user/token']);
        if (store.state['user/token']) {
            config.headers.common['Authorization'] = `Bearer ${store.state['user/token']}`;
            console.log('test');
        }
        config.headers.common['Content-Type'] = 'application/json';
    });
    $axios.defaults.httpsAgent = new https.Agent({ 
        rejectUnauthorized: false
    });
} 
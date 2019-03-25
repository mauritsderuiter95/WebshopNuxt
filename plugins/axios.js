import https from 'https';

export default function ({ $axios, store }) {
    $axios.onRequest(config => {
        if (store.state.token) {
            config.headers.common['Authorization'] = `Bearer ${store.state.token}`;
            console.log('test');
        }
        config.headers.common['Content-Type'] = 'application/json';
    });
    $axios.defaults.httpsAgent = new https.Agent({ 
        rejectUnauthorized: false
    });
} 
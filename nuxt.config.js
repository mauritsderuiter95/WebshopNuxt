import axios from 'axios';
import moment from 'moment';

module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'frontend',
    htmlAttrs: {
      lang: 'nl',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Webshop WRAutomaten',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Material+Icons' },
    ],
  },
  /*
   ** Customize the progress bar color
   */
  loading: { color: '#7C0000' },
  /*
   ** Build configuration
   */
  build: {
    // Add exception
    transpile: ['vee-validate/dist/rules'],
  },
  server: {
    port: 8081,
    host: '0.0.0.0',
  },
  vue: {
    config: {
      performance: true,
    },
  },
  vendor: ['axios', 'vue-cookie', 'vue-notifications'],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    '@nuxtjs/proxy',
    '@nuxtjs/sitemap',
    [
      '@nuxtjs/recaptcha',
      {
        hideBadge: true, // Hide badge element (v3 & v2 via size=invisible)
        siteKey: '6LdAyeQUAAAAABchFvhOLAkEbKrTfAeShiXQeFYF', // Site key for requests
        version: 3, // Version
      },
    ],
    [
      '@nuxtjs/google-tag-manager',
      {
        id: 'GTM-TFQ2RHZ',
        layer: 'dataLayer',
        pageTracking: true,
      },
    ],
  ],
  plugins: [
    '~plugins/vue-cookie.ts',
    '~plugins/axios.ts',
    '~plugins/lazyload.ts',
    '~plugins/vuelidate.ts',
    '~plugins/composition-api.ts',
    '~plugins/validator.ts',
    { src: '~/plugins/axe', ssr: false },
  ],
  css: ['@/assets/scss/style.scss'],
  styleResources: {
    scss: ['@/assets/scss/_vars.scss'],
  },
  layoutTransition: {
    name: 'layout',
    mode: 'out-in',
  },
  axios: {
    // baseURL: 'https://backend.wrautomaten.nl/api',
    baseURL: 'https://0.0.0.0:5001/api',
    // baseURL: 'https://wrbackend.azurewebsites.net/api',
  },
  proxy: {
    '/api': {
      target: () => (process.env.NODE_ENV === 'production' ? 'https://www.wr-automaten.nl/api/products' : 'http://localhost:5001/api/products'),
      pathRewrite: {
        '^/api': '/',
      },
    },
  },
  buildModules: ['@nuxt/typescript-build'],
  sitemap: {
    hostname: 'https://www.wr-automaten.nl',
    gzip: true,
    exclude: ['account'],
    routes() {
      if (process.env.NODE_ENV !== 'production') {
        axios.defaults.baseURL = 'https://localhost:5001/api/products';
      } else {
        axios.defaults.baseURL = 'https://www.wr-automaten.nl/api/products';
      }
      return axios
        .get('/')
        .then((res) => {
          const routes = [];
          res.data.forEach((product) => {
            const route = {};
            route.url = `/products/${product.id}`;
            route.changefreq = 'daily';
            route.priority = 1;
            route.lastmod = moment(product.created).toISOString();
            routes.push(route);
          });
          return routes;
        })
        .catch((e) => {
          // eslint-disable-next-line no-console
          console.log(e);
        });
    },
  },
};

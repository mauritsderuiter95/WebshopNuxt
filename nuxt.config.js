module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'frontend',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Webshop WRAutomaten' },
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
    transpile: [
      'vee-validate/dist/rules',
    ],
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
  ],
  plugins: [
    '~plugins/vue-cookie.js',
    '~plugins/axios.js',
    '~plugins/lazyload.js',
    '~plugins/vuelidate.js',
    '~plugins/composition-api.js',
    '~plugins/validator.js',
  ],
  css: [
    '@/assets/scss/style.scss',
  ],
  styleResources: {
    scss: [
      '@/assets/scss/_vars.scss',
    ],
  },
  layoutTransition: {
    name: 'layout',
    mode: 'out-in',
  },
  axios: {
    baseURL: 'https://backend.wrautomaten.nl/api',
  },
  buildModules: [
    '@nuxt/typescript-build',
  ],
};

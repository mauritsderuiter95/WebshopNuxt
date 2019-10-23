/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
import Vue from 'vue';

if (process.env.NODE_ENV !== 'production' && !false !== true) {
  const VueAxe = require('vue-axe');
  Vue.use(VueAxe, {
    config: {
      // your configuration data
    },
  });
  Vue.config.productionTip = false;
}

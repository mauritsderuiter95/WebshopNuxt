// eslint-disable-next-line import/no-extraneous-dependencies
import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';

Vue.use(VueCompositionApi);

declare module '@vue/composition-api/dist/component/component' {
  interface SetupContext {
    readonly refs: { [key: string]: HTMLElement };
  }
}

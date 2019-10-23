<template>
  <div class="menu-holder">
    <wr-toolbar>
      <nuxt-link to="/">
        <wr-btn
          flat
          :dark="dark"
        >
          Home
        </wr-btn>
      </nuxt-link>
      <nuxt-link to="/koffie">
        <wr-btn
          flat
          :dark="dark"
        >
          Koffie
        </wr-btn>
      </nuxt-link>
      <nuxt-link to="/vending">
        <wr-btn
          flat
          :dark="dark"
        >
          Vending
        </wr-btn>
      </nuxt-link>
      <nuxt-link to="/occasions">
        <wr-btn
          flat
          :dark="dark"
        >
          Occasions
        </wr-btn>
      </nuxt-link>
      <nuxt-link to="/products">
        <wr-btn
          flat
          :dark="dark"
        >
          Bestellen
        </wr-btn>
      </nuxt-link>
      <nuxt-link to="/account">
        <wr-btn
          flat
          :dark="dark"
        >
          <i class="material-icons">account_circle</i>
          <span>&nbsp;&nbsp;&nbsp;Account</span>
        </wr-btn>
      </nuxt-link>
      <slot />
    </wr-toolbar>
  </div>
</template>

<script>
import Toolbar from '../ui-components/Toolbar.vue';
import Button from '../ui-components/Button.vue';

export default {
  components: {
    'wr-toolbar': Toolbar,
    'wr-btn': Button,
  },
  props: {
    dark: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.menu-holder {
    width: 100%;
    margin-bottom: 3rem;
    a {
      margin-right: 2rem;
      text-decoration: none;
      font-size: 1.6rem;
    }
}
</style>

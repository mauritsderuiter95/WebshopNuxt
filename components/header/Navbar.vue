<template>
<div class="menu-holder">
  <wr-toolbar>
    <nuxt-link to="/"><wr-btn flat :dark="dark">Home</wr-btn></nuxt-link>
    <nuxt-link to="/products"><wr-btn flat :dark="dark">Koffie</wr-btn></nuxt-link>
    <nuxt-link to="/products"><wr-btn flat :dark="dark">Vending</wr-btn></nuxt-link>
    <nuxt-link to="/products"><wr-btn flat :dark="dark">Occasions</wr-btn></nuxt-link>
    <slot></slot>
  </wr-toolbar>
</div>
</template>

<script>
import Toolbar from '@/components/ui-components/Toolbar.vue';
import Button from '@/components/ui-components/Button.vue';

export default {
    components: {
      'wr-toolbar': Toolbar,
      'wr-btn': Button
    },
    props: {
      dark: Boolean
    }
}
</script>

<style lang="scss" scoped>
.menu-holder {
    width: 100%;
    margin-bottom: 5rem;
    a {
      margin-right: 2rem;
    }
}
</style>


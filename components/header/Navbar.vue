<template>
<div class="menu-holder">
  <wr-toolbar>
    <nuxt-link to="/"><wr-btn dark flat>Home</wr-btn></nuxt-link>
    <nuxt-link to="/products"><wr-btn dark flat>Koffie</wr-btn></nuxt-link>
    <nuxt-link to="/products"><wr-btn dark flat>Thee</wr-btn></nuxt-link>
    <nuxt-link to="/products"><wr-btn dark flat>Machines</wr-btn></nuxt-link>
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
}
</script>

<style lang="scss" scoped>
.menu-holder {
    width: 100%;
    a {
      margin-right: 2rem;
    }
}
</style>


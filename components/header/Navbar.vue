<template>
<div class="menu-holder">
  <a-menu
    v-model="current"
    mode="horizontal"
    class="menu"
  >
    <a-menu-item key="home">
        <nuxt-link to="/"><a-icon type="home" />Home</nuxt-link>
    </a-menu-item>
    <a-menu-item key="koffie">
      <nuxt-link to="/products"><a-icon type="coffee" />Koffie</nuxt-link>
    </a-menu-item>
    <a-menu-item key="thee">
      <nuxt-link to="/products"><a-icon type="coffee" />Thee</nuxt-link>
    </a-menu-item>
    <a-menu-item key="Machines">
      <nuxt-link to="/products"><a-icon type="coffee" />Machines</nuxt-link>
    </a-menu-item>
  </a-menu>
</div>
</template>

<script>
import { Menu, Icon } from 'ant-design-vue';

export default {
    components: {
        'a-menu': Menu,
        "a-menu-item": Menu.Item,
        "a-icon": Icon
    },
    data () {
        return {
            current: ['mail'],
        }
    },
}
</script>

<style lang="scss" scoped>
.menu-holder {
    width: 100%;
    margin-top: 2rem;
    .menu {
        width: 100%;
    }
}
</style>


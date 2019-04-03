<template>
<div class="menu-holder">
  <v-toolbar dark color="primary">
    <v-toolbar-side-icon></v-toolbar-side-icon>

    <v-toolbar-title class="white--text">Title</v-toolbar-title>

    <v-spacer></v-spacer>

    <nuxt-link to="/"><v-btn flat>Home</v-btn></nuxt-link>
    <nuxt-link to="/products"><v-btn flat>Koffie</v-btn></nuxt-link>
    <nuxt-link to="/products"><v-btn flat>Thee</v-btn></nuxt-link>
    <nuxt-link to="/products"><v-btn flat>Machines</v-btn></nuxt-link>
  </v-toolbar>
</div>
</template>

<script>

export default {
    components: {
    },
}
</script>

<style lang="scss" scoped>
.menu-holder {
    width: 100%;
}
</style>


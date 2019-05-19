<template>
  <div id="adminLayout">
    <v-app>
      <Toolbar />
      <Drawer />
      <v-content>
        <div id="core-view">
          <v-fade-transition mode="out-in">
            <nuxt />
          </v-fade-transition>
        </div>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import Drawer from "~/components/admin/core/Drawer.vue";
import Toolbar from "~/components/admin/core/Toolbar.vue";

export default {
  components: {
    Toolbar,
    Drawer
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/index.scss';
</style>

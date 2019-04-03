<template>
    <v-app>
        <Navbar />
        <nuxt/>
    </v-app>
</template>

<script>
import Navbar from '~/components/header/Navbar.vue';

export default {
  components: {
      Navbar
  },
}
</script>


<style lang="scss" scoped>
</style>

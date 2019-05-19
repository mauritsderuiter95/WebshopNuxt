<template>
  <div class="wrapper">
    <Header />
    <nuxt />
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/header/Header.vue';
import Footer from '~/components/footer/Footer.vue';

export default {
  components: {
    Header,
    Footer
  }
}
</script>


<style lang="scss" scoped>
.wrapper {
  margin: 3rem;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 60px);
}

@media screen and (max-width: 1024px) {
  .wrapper {
    margin: 0;
  }
}

</style>



<template>
  <div class="wrapper">
    <Header />
    <div class="body-content">
      <nuxt />
    </div>
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

.body-content {
  margin-top: -24rem;
  position: relative;
  z-index: 2;
}

@media screen and (max-width: 1024px) {
  .wrapper {
    margin: 0;
  }
  .body-content {
    margin-top: -37rem;
  }
}

</style>



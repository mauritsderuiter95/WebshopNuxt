<template>
  <div class="wrapper">
    <!-- <div class="notice" role="banner">
      Deze shop is nog in aanbouw. Bestellingen worden geannuleerd.
    </div> -->
    <Header role="navigation" />
    <div class="body-content" role="main">
      <nuxt />
    </div>
    <Footer role="contentinfo" />
  </div>
</template>

<script>
import Header from '../components/header/Header.vue';
import Footer from '../components/footer/Footer.vue';

export default {
  components: {
    Header,
    Footer,
  },
};
</script>


<style lang="scss" scoped>
.wrapper {
  margin: 3rem;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 60px);
}

.notice {
  position: fixed;
  top: 0;
  z-index: 10;
  text-align: center;
  padding: 2rem;
  width: 100%;
  left: 0;
  color: #fff;
  background: #ffc107;
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
    // margin: 0 3rem;
  }
}

</style>

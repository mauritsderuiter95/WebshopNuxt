<template>
  <div class="wrapper">
    <Header />
    <div class="body">
      <div class="sidebar">
        <Usermenu />
      </div>
      <div class="content">
        <nuxt/>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/header/Header.vue';
import Footer from '~/components/footer/Footer.vue';
import Usermenu from '~/components/Usermenu.vue';

export default {
  components: {
    Header,
    Footer,
    Usermenu
  }
}
</script>


<style lang="scss" scoped>
.wrapper {
  margin: 3rem;
  .body {
    margin: 0;
    display: flex;
    .sidebar {
      width: 20%;
    }
    .content {
      margin-left: 3rem;
      width: 80%;
    }
  }
}
</style>
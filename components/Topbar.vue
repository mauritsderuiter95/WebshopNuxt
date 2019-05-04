<template>
  <nav class="topbar">
    <div class="menu">
      <Catmenu />
    </div>
    <div class="searchBar">
      <Search />
    </div>
  </nav>
</template>

<script>
import Search from '~/components/Search.vue';
import Catmenu from '~/components/Catmenu.vue';

export default {
    components: {
        Search,
        Catmenu,
    }
}
</script>

<style lang="scss" scoped>
.topbar {
  display: flex;
  max-width: 120rem;
  margin: 0 auto 5rem;
    .menu {
        background: #fff;
        border-radius: 4px;
        transition: 0.3s;
        box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
        width: 75%;
        margin-right: 4rem;
    }
    .searchBar {
      width: 25%;
    }
}
</style>

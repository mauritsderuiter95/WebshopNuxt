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
        border-radius: $border-radius;
        transition: 0.3s;
        box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
        width: 75%;
        margin-right: 4rem;
    }
    .searchBar {
      width: 25%;
    }
}

@media screen and (max-width: 1024px) {
  .topbar {
    margin: 0 6rem 6rem;
    .menu {
      width: 50%;
      margin-right: 3rem;
    }
    .searchBar {
      width: 50%;
      margin-left: 3rem;
    }
  }
}

@media screen and (max-width: 768px) {
  .topbar {
    flex-wrap: wrap;
    .menu {
      width: 100%;
      margin: 0
    }
    .searchBar {
      width: 100%;
      margin-left: 0;
      margin-top: 3rem;
    }
  }
}

@media screen and (max-width: 425px) {
  .topbar {
    margin: 0 3rem 3rem;
  }
}
</style>

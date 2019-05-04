<template>
  <div class="bar">
    <h2 class="categoryTitle">
      Categorieën
    </h2>
    <ul class="categoryList">
      <li class="categoryListItem">
        <nuxt-link to="/products">
          <wr-btn flat>
            Alle
          </wr-btn>
        </nuxt-link>
      </li>
      <li
        v-for="category in categoryList"
        :key="category"
        class="categoryListItem"
      >
        <nuxt-link :to="'/products?category=' + category">
          <wr-btn flat>
            {{ category }}
          </wr-btn>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import Button from '~/components/ui-components/Button.vue';
import ProductService from '~/services/product.service.js';

export default {
    components: {
        'wr-btn': Button
    },
    data() {
        return { categoryList: Array }
    },
    mounted() {
        ProductService.getCategories()
        .then((res) => {
            this.categoryList = res.data;
        });
    }
}
</script>

<style lang="scss" scoped>
.bar {
  display: flex;
  align-items: center;
  .categoryTitle {
    margin: 0;
    padding: 2rem;
    border-right: 1px solid rgba(0,0,0,0.2);
  }
  .categoryList {
    list-style-type: none;
    margin: 0 0 0 2rem;
    display: flex;
    .categoryListItem {
      color: #000;
      font-size: 2rem;
    }
  }
}
</style>

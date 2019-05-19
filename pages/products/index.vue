<template>
  <div class="body">
    <Topbar />
    <section class="content">
      <ul class="productList">
        <li
          v-for="product in productList"
          :key="product.id"
        >
          <ProductGridView :product="product" />
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import ProductGridView from '~/components/ProductGridView.vue';
import ProductService from '~/services/product.service.js';
import Topbar from '~/components/Topbar.vue';

export default {
  components: {
    ProductGridView,
    Topbar
  },
  // Watch for $route.query.page to call Component methods (asyncData, fetch, validate, layout, etc.)
  watchQuery: ['category'],
  asyncData({query}) {
    return ProductService.getProducts(query.category)
      .then((res) => {
        return { productList: res.data }
      });
  }
}
</script>

<style lang="scss" scoped>
.body {
  .content {
    margin: 0 auto;
    max-width: 120rem;
    .productList {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 6rem;
      list-style-type: none;
      padding-left: 0;
    }
  }
}

@media screen and (max-width: 1024px) {
  .body{
    .content {
      .productList {
        grid-template-columns: 1fr 1fr;
        margin: 0 6rem;
      }
    }
  }
}

@media screen and (max-width: 425px) {
  .body{
    .content {
      .productList {
        grid-template-columns: 1fr;
        margin: 0 3rem;
      }
    }
  }
}
</style>


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
</style>


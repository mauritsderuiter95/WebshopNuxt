<template>
  <div class="body">
    <Sidebar />
    <section class="content">
      <ul class="productList">
        <li v-for="product in productList" :key="product.id">
          <ProductGridView :product="product" />
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import ProductGridView from '~/components/ProductGridView.vue';
import ProductService from '~/services/product.service.js';
import Sidebar from '~/components/Sidebar.vue';

export default {
  components: {
    ProductGridView,
    Sidebar
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
  margin: 0;
  display: flex;
  .content {
    margin-left: 6rem;
    margin-right: 3rem;
    width: 80%;
    .productList {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 6rem;
      list-style-type: none;
      padding-left: 0;
    }
  }
}
</style>


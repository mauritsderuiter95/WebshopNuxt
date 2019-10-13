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

<script lang="ts">
import { createComponent } from '@vue/composition-api';
import ProductGridView from '../../components/ProductGridView.vue';
import ProductService from '../../services/product.service';
import Topbar from '../../components/Topbar.vue';

export default createComponent({
  components: {
    ProductGridView,
    Topbar,
  },
  // Watch for $route.query.page to call Component methods
  watchQuery: ['category'],
  asyncData({ query }) {
    return ProductService.getProducts(query.category)
      .then((res) => ({ productList: res.data }));
  },
});
</script>

<style lang="scss" scoped>
.body {
  margin-top: 5rem;
}
</style>

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
  watchQuery: ['category', 'search'],
  asyncData({ query }) {
    return ProductService.getProducts((query.category as string | null))
      .then((res) => {
        let productList = res.data;
        if (query.search) {
          const filteredList = [];
          productList.forEach((product) => {
            if (product.productName.toLowerCase().includes(query.search.toLowerCase())) {
              filteredList.push(product);
            }
            productList = filteredList;
          });
        }
        return {
          productList,
        };
      })
      .catch((e) => {
        console.log(e);
        return {
          productList: [],
        };
      });
  },
});
</script>

<style lang="scss" scoped>
.body {
  margin-top: 5rem;
}
</style>

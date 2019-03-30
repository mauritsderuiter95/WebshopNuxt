<template>
  <section class="container">
    <ul class="productList">
      <li v-for="product in productList" :key="product.id">
        <ProductGridView :product="product" />
      </li>
    </ul>
  </section>
</template>

<script>
import ProductGridView from '~/components/ProductGridView.vue';
import ProductService from '~/services/product.service.js';

export default {
  components: {
    ProductGridView
  },
  asyncData() {
    return ProductService.getProducts()
    .then((response) => {
      return { productList: response.data}
    })
  }
}
</script>

<style lang="scss" scoped>
.productList {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 3rem;
  list-style-type: none;
}
</style>


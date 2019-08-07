<template>
  <div class="body">
    <Box
      title="Occasion"
      content="Regelmatig bieden wij ervaren automaten aan. Deze automaten zijn volledig gereviseerd en in topconditie. Jarenlang kunt u genieten voor een lage investering in een uitstekend automaat. Voor ons actuele aanbod kijkt u op onze occasion-pagina."
    />
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
import Box from '@/components/ui-components/Box.vue';

export default {
  components: {
    Box,
    ProductGridView
  },
  asyncData() {
    return ProductService.getProducts()
      .then((res) => {
        return { productList: res.data }
      });
  }

}
</script>

<style lang="scss" scoped>
</style>


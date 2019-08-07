<template>
  <div class="body">
    <Box
      title="WR Koffie"
      content="Onze heerlijke ambachtelijk gebrande bonen komen uit Indonesië en Ethiopië. WR Koffie Classic is een milde koffie, zonder de bittere nasmaak en is geschikt voor de gemiddelde koffiedrinker. De variant Strong is een streling op de tong voor dé koffieliefhebber."
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


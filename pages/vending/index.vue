<template>
  <div class="body">
    <Box
      title="Vending"
      content="Kostenloos plaatsen wij frisdrank- en/of zoetwarenautomaten. Wekelijks vullen en onderhouden wij dit automaat, zodat u er geen omkijken naar hebt. Wij ontzorgen u volledig! Neem voor alle mogelijkheden vrijblijvend contact op met Wim de Ruiter op 06 - 143 976 20. Voor elke kantine een passend automaat!"
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


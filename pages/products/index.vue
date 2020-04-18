<template>
  <div class="body">
    <Modal
      :show-modal="state.showModal"
      :product="state.modalProduct"
      @hide="state.showModal = false"
    />
    <Topbar />
    <section class="content">
      <ul class="productList">
        <li v-for="product in productList" :key="product.id">
          <ProductGridView :product="product" @added="addedToCart" />
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import { createComponent, reactive } from '@vue/composition-api';
import ProductGridView from '../../components/ProductGridView.vue';
import ProductService from '../../services/product.service';
import Topbar from '../../components/Topbar.vue';
import Product from '../../models/Product';
import Modal from '../../components/ui-components/Modal.vue';

export default createComponent({
  components: {
    ProductGridView,
    Topbar,
    Modal,
  },
  // Watch for $route.query.page to call Component methods
  watchQuery: ['category', 'search'],
  asyncData({ query }: any) {
    return ProductService.getProducts(query.category as string | null)
      .then((res) => {
        let productList = res.data;
        if (query.search) {
          const filteredList: Product[] = [];
          productList.forEach((product: Product) => {
            const queryString = (query.search as string).toLowerCase();
            if (product.productName.toLowerCase().includes(queryString)) {
              filteredList.push(product);
            }
            productList = filteredList;
          });
        }
        return {
          productList,
        };
      })
      .catch(() => ({
        productList: [],
      }));
  },
  setup(props, ctx) {
    const state = reactive({
      showModal: false,
      modalProduct: new Product(),
    });

    function addedToCart(product: Product) {
      console.log('test');
      state.modalProduct = product;
      state.showModal = true;
    }

    return {
      state,
      addedToCart,
      ctx,
      props,
    };
  },
});
</script>

<style lang="scss" scoped>
.body {
  margin-top: 1rem;
  .productList {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}
</style>

<template>
  <div>
    <nuxt-link to="/cart">
      <wr-btn color="white">
        <i class="material-icons">shopping_cart</i>{{ getProducts }}
        <span v-if="getProducts === 1">&nbsp;product</span>
        <span v-else>&nbsp;producten</span>
      </wr-btn>
    </nuxt-link>
  </div>
</template>

<script>
import btn from '../ui-components/Button.vue';

export default {
  components: {
    'wr-btn': btn,
  },
  data() {
    return {
      products: 0,
    };
  },
  computed: {
    getProducts() {
      if (this.$store.getters['cart/currentCart']) {
        if (this.$store.getters['cart/currentCart'].products) { return this.$store.getters['cart/currentCart'].products.length; }
        return 0;
      }
      return 0;
    },
  },
  methods: {
    emptyCart() {
      this.$store.commit('cart/clearCart');
    },
  },
};
</script>

<style lang="scss" scoped>

</style>

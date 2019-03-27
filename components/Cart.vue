<template>
    <div>
        <span>({{ getProducts }})</span>
        <button @click="emptyCart">Empty Cart</button>
    </div>
</template>

<script>
import CartService from '~/services/cart.service.js';

export default {
    components: {
    },
    data() {
        return {
            products: 0
        };
    },
    computed: {
        getProducts() {
            if(this.$store.getters['cart/currentCart'])
                return this.$store.getters['cart/currentCart'].products.length;
            else
                return 0;
        }
    },
    methods: {
        emptyCart() {
            this.$store.commit('cart/clearCart');
        }
    }
}
</script>

<style lang="scss" scoped>

</style>



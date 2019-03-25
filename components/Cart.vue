<template>
    <div>
        <span>({{ products }})</span>
    </div>
</template>

<script>
import CartService from '~/services/cart.service.js';

export default {
    components: {
    },
    fetch ({ store}) {
        store.dispatch("cart/cart/getCart");
    },
    computed: {
        products() {
            if(this.$store.state.cart.currentCart) {
                if(this.$store.state.cart.currentCart.products) {
                    return this.$store.state.cart.currentCart.products.length;
                }
            }
            return 0;
        }
    }
}
</script>

<style lang="scss" scoped>

</style>



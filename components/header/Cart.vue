<template>
    <div>
        <nuxt-link to="/cart"><v-btn block color="primary"><v-icon>shopping_cart</v-icon>{{ getProducts }} <span v-if="getProducts === 1">&nbsp;product</span><span v-else>&nbsp;producten</span></v-btn></nuxt-link>
    </div>
</template>

<script>

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
            if(this.$store.getters['cart/currentCart']) {
                if (this.$store.getters['cart/currentCart'].products)
                    return this.$store.getters['cart/currentCart'].products.length;
                else
                    return 0;
            }
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



<template>
    <div>
        <a-button type="primary"><a-icon type="shopping-cart" />{{ getProducts }} <span v-if="products.length === 1">&nbsp;product</span><span v-else>&nbsp;producten</span></a-button>
    </div>
</template>

<script>
import { Button, Icon } from 'ant-design-vue';

export default {
    components: {
        'a-button': Button,
        'a-icon': Icon
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
button {
    width: 100%;
}
</style>



<template>
    <a-card
        hoverable
    >
        <img
            :alt="product.photos[0].alt"
            :src="product.photos[0].url"
            :title="product.photos[0].title"
            slot="cover"
        />
        <a-card-meta
            :title="product.productName">
        </a-card-meta>
        <p>{{ product.shortDescription }}</p>
        <p>{{ product.price }}</p>
        <template class="ant-card-actions" slot="actions">
            <nuxt-link :to="{ path: `/products/${product.id}`}" class="btn info">Info</nuxt-link>
            <a class="btn" @click="addToCart">Bestellen</a>
        </template>
    </a-card> 
</template>

<script>
import { Card} from 'ant-design-vue';

export default {
    components: {
        'a-card': Card,
        'a-card-meta': Card.Meta
    },
    props: {
        product: Object
    },
    methods: {
        addToCart() {
            this.$store.dispatch("cart/addToCart", this.product);
        }
    }
}
</script>

<style lang="scss" scoped>
.ant-card {
    height: 100%;
    display: flex;
    flex-direction: column;
    /deep/ li {
        margin: 0;
        /deep/ span {
            display: block;
            height: 100%;
            width: 100%;
            /deep/ a {
                padding: 12px 0;
                display: block;
                height: 100%;
                width: 100%;
            }
        }
    }
}
</style>
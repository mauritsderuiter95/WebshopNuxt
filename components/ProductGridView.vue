<template>
    <wr-card>
        <wr-img
            :src="product.photos[0].url"
            :aspect-ratio="2"
            :alt="product.photos[0].alt"
            :title="product.photos[0].title"
        ></wr-img>

        <div class="content">
            <h3 class="headline mb-0">{{ product.productName }}</h3>
            <p> {{ product.shortDescription }} </p>
        </div>

        <div class="footer">
            <nuxt-link :to="{ path: `/products/${product.id}`}" class="info-btn"><wr-btn flat>Info</wr-btn></nuxt-link>
            <wr-btn flat dark color="primary" @click="addToCart">Bestellen</wr-btn>
        </div>
    </wr-card>
</template>

<script>
import img from '@/components/ui-components/Image.vue';
import card from '@/components/ui-components/Card.vue';
import btn from '@/components/ui-components/Button.vue';

export default {
    components: {
        'wr-img': img,
        'wr-card': card,
        'wr-btn': btn
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
.content {
    padding: 1rem;
    margin-bottom: 52px;
}
.footer {
    margin-top: auto;
    position: absolute;
    bottom: 0;
    display: flex;
    padding: 1rem;
    .info-btn {
        margin-right: 1rem;
    }
}
</style>
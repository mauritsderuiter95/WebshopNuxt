<template>
    <v-card>
        <v-img
            :src="product.photos[0].url"
            aspect-ratio="2.75"
            :alt="product.photos[0].alt"
            :title="product.photos[0].title"
        ></v-img>

        <v-card-title primary-title>
            <div>
                <h3 class="headline mb-0">{{ product.productName }}</h3>
                <div> {{ product.shortDescription }} </div>
            </div>
        </v-card-title>

        <v-card-actions>
            <nuxt-link :to="{ path: `/products/${product.id}`}"><v-btn flat>Info</v-btn></nuxt-link>
            <v-btn flat color="primary" @click="addToCart">Bestellen</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>

export default {
    components: {
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
.v-card {
    height: 100%;
    position: relative;
    &__title {
        margin-bottom: 52px;
    }
    &__actions {
        margin-top: auto;
        position: absolute;
        bottom: 0;
    }
}
</style>
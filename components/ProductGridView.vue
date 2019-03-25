<template>
    <div class="box">
        <nuxt-link :to="{ path: `/products/${product.id}`}">
            <div class="header">
                <img :src="product.photos[0].url" :alt="product.photos[0].alt" :title="product.photos[0].title">
            </div>
            <div class="content" @click.native="goToProduct(product.id)">
                <h3>{{ product.productName }}</h3>
                <hr>
                <p>{{ product.shortDescription }}</p>
                <span>{{ product.price }}</span>
            </div>
        </nuxt-link>
        <footer>
            <nuxt-link :to="{ path: `/products/${product.id}`}" class="btn info">Info</nuxt-link>
            <a class="btn" @click="addToCart">Bestellen</a>
        </footer>
    </div>
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
            this.$store.dispatch("cart/editCart", this.product);
        }
    }
}
</script>

<style lang="scss" scoped>
    .box {
        background: #fff;
        box-shadow: 0 0 1rem 0 rgba(0,0,0,0.2);
        width: 100%;
        border-radius: .5rem;
        overflow: hidden;
        height: 100%;
        display: flex;
        flex-direction: column;
        transition: all 0.2s;
        cursor: pointer;
        .header {
            img {
                width: 100%;
            }
        }
        a {
            text-decoration: none;
            color: #000;
        }
        .content {
            padding: 2rem;
        }
        hr {
            margin: 2rem 0;
        }
        footer {
            margin-top: auto;
            display: flex;
            .btn {
                display: block;
                padding: 2rem 0;
                text-align: center;
                color: #fff;
                background: $primary-color;
                width: 50%;
                &:hover {
                    background: darken($primary-color, 5%)
                }
            }
            .info {
                background: $secondary-color;
                &:hover {
                    background: darken($secondary-color, 15%)
                }
            }
        }
        &:hover{
            transform: translateY(-1rem);
            box-shadow: 0 1rem 1rem 0 rgba(0,0,0,0.2);
        }
    }
</style>
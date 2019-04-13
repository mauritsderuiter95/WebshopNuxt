<template>
    <div>
        <h2 class="categoryTitle">Categorieën</h2>
        <ul class="categoryList">
            <li class="categoryListItem"><nuxt-link to="/products"><wr-btn flat>Alle</wr-btn></nuxt-link></li>
            <li class="categoryListItem" v-for="category in categoryList" :key="category"><nuxt-link :to="'/products?category=' + category"><wr-btn flat>{{ category }}</wr-btn></nuxt-link></li>
        </ul>
    </div>
</template>

<script>
import Button from '~/components/ui-components/Button.vue';
import ProductService from '~/services/product.service.js';

export default {
    components: {
        'wr-btn': Button
    },
    data() {
        return { categoryList: Array }
    },
    mounted() {
        ProductService.getCategories()
        .then((res) => {
            this.categoryList = res.data;
        });
    }
}
</script>

<style lang="scss" scoped>
.categoryTitle {
      margin-top: 4rem;
      font-size: 3rem;
}
.categoryList {
    list-style-type: none;
    margin-bottom: 4rem;
    .categoryListItem {
        color: #000;
        font-size: 2rem;
    }
}
</style>

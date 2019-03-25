<template>
  <div>
    <header>
      <div class="left">
        <i class="material-icons">arrow_back</i>
        <h1>{{ product.productName }}</h1>
      </div>
      <i class="material-icons">home</i>
    </header>
    <div class="grid">
      <div class="photos" v-if="product.photos">
        <div class="featured">
           <img :src="product.photos[0].url" :alt="product.photos[0].alt" :title="product.photos[0].title" />
        </div>
        <ul class="imageList">
          <li class="smallImage"></li>
        </ul>
      </div>
      <div class="info"></div>
      <div class="actions"></div>
    </div>
  </div>
</template>

<script>
import ProductService from '~/services/product.service.js';

export default {
  components: {
  },
  asyncData({ params }) {
    return ProductService.getProduct(params.id)
    .then((response) => {
      return {product: response.data}
    })
  },
  layout: 'product'
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: #fff;
  box-shadow: 0 0 5px 0 rgba(0,0,0,0.2);
  align-items: center;
  .left {
    display: flex;
    align-items: center;
    h1 {
      margin-left: 1rem;
      font-size: 2.4rem;
      font-weight: 400;
    }
  }
  
}
.grid {
  display: grid;
  min-height: calc(100vh - 49px);
  grid-template-columns: 1fr 1fr 1fr;
  .photos {
    .featured {
      img {
        width: 100%;
      }
    }
  }
  >div {
    padding: 2rem;
    border-right: 1px solid #000;
  }
}
</style>


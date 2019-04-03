<template>
  <div class="container">
    <div class="grid">
      <div class="half">
        <div class="photos" v-if="product.photos">
          <div class="featured">
            <transition name="fade" mode="out-in">
              <img :src="featuredPhoto.url" :alt="featuredPhoto.alt" :title="featuredPhoto.title" :key="featuredPhoto.url" />
            </transition>
          </div>
          <ul class="imageList">
            <li v-for="photo in product.photos" :key="photo.url" @click="bigPicture(photo)">
              <img :src="photo.url" :alt="photo.alt" :title="photo.title" />
            </li>
          </ul>
        </div>
      </div>
      <div class="half">
        <h1>{{ product.productName }}</h1>
        <p>{{ product.shortDescription }}</p>
        <div class="actions">
          <v-btn @click="addToCart" color="primary">Add to cart</v-btn>
        </div>
      </div>
    </div>
    <div class="productInfo">
      <div v-html="product.longDescription">
      </div>
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
      return {
        product: response.data,
        featuredPhoto: response.data.photos[0]
      }
    })
  },
  methods: {
    bigPicture(photo) {
      this.featuredPhoto = photo;
    },
    addToCart() {
      this.$store.dispatch("cart/addToCart", this.product);
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  width: 1200px;
  background: #fff;
  box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12);
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 2rem;
    .half {
      display: flex;
      flex-direction: column;
    }
  }
}
.photos {
  overflow: hidden;
  .featured {
    img {
      width: 100%;
      border-radius: 0.5rem;
    }
  }
  .imageList {
    list-style-type: none;
    display: grid;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1rem;
    margin-top: 1rem;
    padding-left: 0;
    li {
      cursor: pointer;
      img {
        width: 100%;
        border-radius: 0.5rem;
      }
    }
  }
}
.productInfo {
  font-size: 1.6rem;
  /deep/ p {
    margin-bottom: 2rem;
  }
  /deep/ ul {
    margin-left: 2rem;
  }
}
.actions {
  display: grid;
  margin-top: auto;
  margin-bottom: 1em;
}
>div {
  padding: 2rem;
}

.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  opacity: 1;
  transition: opacity .2s;
}
.fade-leave-to {
  opacity: 1;
}
.fade-leave-active {
  opacity: 0;
  transition: opacity .2s;
}
</style>


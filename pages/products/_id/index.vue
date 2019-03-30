<template>
  <div class="container">
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
      <div class="actions">
        <a-button type="primary" @click="addToCart">Bestellen</a-button>
      </div>
    </div>
    <div class="info">
      <div v-html="product.longDescription">
      </div>
    </div>
  </div>
</template>

<script>
import ProductService from '~/services/product.service.js';
import { Button } from 'ant-design-vue';

export default {
  components: {
    'a-button': Button
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
      this.$store.dispatch("cart/editCart", this.product);
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  margin-top: 5rem;
  .half {
    width: 50%;
    padding: 0 1rem;
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
    li {
      cursor: pointer;
      img {
        width: 100%;
        border-radius: 0.5rem;
      }
    }
  }
}
.info {
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


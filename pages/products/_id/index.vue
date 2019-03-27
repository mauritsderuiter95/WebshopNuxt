<template>
  <div class="product">
    <header>
      <div class="left">
        <a @click="goBack"><i class="material-icons">arrow_back</i></a>
        <h1>{{ product.productName }}</h1>
      </div>
      <div class="right">
        <nuxt-link to="/"><i class="material-icons">home</i></nuxt-link>
        <a @click="goBack"><i class="material-icons">close</i></a>
      </div>
    </header>
    <div class="grid">
      <div class="photos" v-if="product.photos">
        <div class="featured">
          <transition name="fade" mode="out-in">
            <img :src="product.photos[0].url" :alt="product.photos[0].alt" :title="product.photos[0].title" ref="featuredImg" key="odd" />
          </transition>
        </div>
        <ul class="imageList">
          <li v-for="photo in product.photos" :key="photo.url" @click="bigPicture(photo)">
            <img :src="photo.url" :alt="photo.alt" :title="photo.title" />
          </li>
        </ul>
      </div>
      <div class="info">
        <div v-html="product.longDescription">
        </div>
      </div>
      <div class="actions">
        <a @click="addToCart" class="btn">Bestellen</a>
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
        product: response.data
      }
    })
  },
  methods: {
    bigPicture(photo) {
      this.$refs.featuredImg.src = photo.url;
      this.$refs.featuredImg.alt = photo.alt;
      this.$refs.featuredImg.title = photo.title;
    },
    goBack() {
      this.$router.back();
    },
    addToCart() {
      this.$store.dispatch("cart/editCart", this.product);
    }
  },
  layout: 'product',
  transitions: 'productPage'
}
</script>

<style lang="scss" scoped>
.product {
  background: #fff;
  position: absolute;
  top: 0;
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
      a {
        display: flex;
        align-items: center;
      }
    }
    .right {
      display: flex;
      align-items: center;
      a {
        margin-right: 1rem;
      }
    }
    a {
      color: #000;
      cursor: pointer;
    }
  }
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding-top: 5rem;
    .photos {
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
      .btn {
        display: block;
        padding: 2rem;
        background: $primary-color;
        border-radius: 5px;
        color: #fff;
        box-shadow: 0 0 1rem rgba(0,0,0,0.5);
        font-size: 1.6rem;
        text-align: center;
        align-self: flex-end;
        cursor: pointer;
        &:hover {
          background: darken($primary-color, 5%);
        }
      }
    }
    >div {
      padding: 2rem;
    }
  }

  .fade-enter {
    opacity: 0;
  }
  .fade-enter-active {
    opacity: 1;
    transition: opacity 1s;
  }
  .fade-leave {
    opacity: 1;
  }
  .fade-leave-active {
    opacity: 0;
    transition: opacity 1s;
  }
}
</style>


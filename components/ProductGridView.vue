<template>
  <div class="wrapper" @click="goToPage">
    <wr-card>
      <wr-img
        :src="product.photo.url"
        :aspect-ratio="2"
        :alt="product.photo.alt"
        :title="product.photo.title"
      />

      <div class="content">
        <wr-btn
          flat
          big
          outline
          color="white"
          text-color="text-primary"
          class="buy"
          @click.stop="addToCart"
        >
          <i class="material-icons" data-v-de1b67a6="" data-v-966372d2="">shopping_cart</i>
        </wr-btn>
        <h3 class="headline mb-0">
          {{ product.productName }}
        </h3>
        <p>{{ product.shortDescription }}</p>
      </div>

      <div class="footer">
        <span class="price">€{{ Number(product.price).toFixed(2) }}</span>
      </div>
    </wr-card>
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api';
import img from './ui-components/Image.vue';
import card from './ui-components/Card.vue';
import btn from './ui-components/Button.vue';

export default createComponent({
  components: {
    'wr-img': img,
    'wr-card': card,
    'wr-btn': btn,
  },
  props: {
    // eslint-disable-next-line
    product: Object,
  },
  setup(props, ctx) {
    const addToCart = () => {
      ctx.root.$store.dispatch('cart/addToCart', props.product);
      ctx.emit('added', props.product);
    };
    const goToPage = () => {
      if (props.product) {
        ctx.root.$router.push(`/products/${props.product.id}`);
      }
    };

    return {
      addToCart,
      goToPage,
    };
  },
});
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  cursor: pointer;
  .content {
    margin-top: 1rem;
    margin-bottom: 9rem;
    padding: 0 4rem;
    position: relative;
    z-index: 1;
    h3 {
      font-size: 2rem;
    }
    p {
      font-size: 1.8rem;
      margin-top: 1rem;
      line-height: 1.5;
    }
    .buy {
      display: block;
      top: -8rem;
      right: 3rem;
      z-index: 2;
      width: 7rem;
      height: 7rem;
      position: absolute;
    }
    &::before {
      content: '';
      width: 200%;
      height: 100px;
      position: absolute;
      display: block;
      background-color: #fff;
      -webkit-transform: rotate(-8deg);
      transform: rotate(-8deg);
      top: -5rem;
      left: -10%;
      z-index: -1;
    }
  }
  .footer {
    margin-top: auto;
    position: absolute;
    bottom: 0;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    .price {
      display: block;
      font-size: 2.4rem;
      color: #7c0000;
      font-weight: 700;
      margin-left: auto;
      margin-right: 4rem;
      margin-bottom: 4rem;
    }
  }
}
</style>

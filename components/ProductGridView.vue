<template>
  <div class="wrapper">
    <Modal
      :show-modal="state.showModal"
      :product="product"
      @hide="state.showModal = false"
    />
    <wr-card>
      <nuxt-link :to="`/products/${product.id}`">
        <wr-img
          :src="product.photo.url"
          :aspect-ratio="1"
          :alt="product.photo.alt"
          :title="product.photo.title"
        />
      </nuxt-link>

      <div class="content">
        <nuxt-link :to="`/products/${product.id}`">
          <h3 class="headline mb-0">
            {{ product.productName }}
          </h3>
        </nuxt-link>
        <p> {{ product.shortDescription }} </p>
      </div>

      <div class="footer">
        <span class="price">€{{ Number(product.price).toFixed(2) }}</span>
        <div class="buttons">
          <nuxt-link
            :to="`/products/${product.id}`"
            class="info-btn"
          >
            <wr-btn
              flat
              block
              big
            >
              Info
            </wr-btn>
          </nuxt-link>
          <wr-btn
            block
            flat
            big
            dark
            color="primary"
            @click="addToCart"
          >
            Bestellen
          </wr-btn>
        </div>
      </div>
    </wr-card>
  </div>
</template>

<script lang="ts">
import {
  createComponent, reactive,
} from '@vue/composition-api';
import img from './ui-components/Image.vue';
import card from './ui-components/Card.vue';
import btn from './ui-components/Button.vue';
import Modal from './ui-components/Modal.vue';

export default createComponent({
  components: {
    'wr-img': img,
    'wr-card': card,
    'wr-btn': btn,
    Modal,
  },
  props: {
    // eslint-disable-next-line
        product: Object
  },
  setup(props, ctx) {
    const state = reactive({
      showModal: false,
    });

    const addToCart = () => {
      state.showModal = true;
      ctx.root.$store.dispatch('cart/addToCart', props.product);
    };

    const hide = () => {
      state.showModal = false;
    };

    return {
      state,
      addToCart,
      hide,
    };
  },
});
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  .content {
    margin-top: 4rem;
    margin-bottom: 14rem;
    padding: 0 4rem;
    h3 {
        font-size: 2rem;
    }
    p {
        font-size: 1.8rem;
    }
  }
  .footer {
    margin-top: auto;
    position: absolute;
    bottom: 0;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    .buttons {
      display: flex;
      width: 100%;
      .info-btn {
        margin-right: 1rem;
        display: block;
        width: 100%;
      }
    }
    .price {
      display: block;
      font-size: 2.4rem;
      color: #7C0000;
      font-weight: 700;
      margin-left: auto;
      margin-right: 2rem;
      margin-bottom: 2rem;
    }
  }
}
</style>

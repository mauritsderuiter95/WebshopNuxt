<template>
  <div class="wrapper">
    <Modal
      :show-modal="showModal"
      :product="product"
      @hide="showModal = false"
    />
    <wr-card>
      <nuxt-link :to="`/products/${product.id}`">
        <wr-img
          :src="product.photos[0].url"
          :aspect-ratio="1"
          :alt="product.photos[0].alt"
          :title="product.photos[0].title"
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
    </wr-card>
  </div>
</template>

<script>
import img from '@/components/ui-components/Image.vue';
import card from '@/components/ui-components/Card.vue';
import btn from '@/components/ui-components/Button.vue';
import Modal from '~/components/ui-components/Modal.vue';

export default {
    components: {
        'wr-img': img,
        'wr-card': card,
        'wr-btn': btn,
        Modal
    },
    props: {
        // eslint-disable-next-line
        product: Object
    },
    data() {
      return {
        showModal: false
      }
    },
    methods: {
        addToCart() {
          this.showModal = true;
          this.$store.dispatch("cart/addToCart", this.product);
        },
        hide() {
          this.showModal = false;
        }
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  .content {
    margin-top: 4rem;
    margin-bottom: 11rem;
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
    width: 100%;
    .info-btn {
      margin-right: 1rem;
      display: block;
      width: 100%;
    }
  }
}
</style>

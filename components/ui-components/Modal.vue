<template>
  <div
    v-show="showModal"
    class="modalBackground"
    @click.self="hide"
  >
    <div
      class="modal"
    >
      <div class="row">
        <div class="col">
          <div class="message">
            <i class="material-icons">
              check
            </i>
            <h3>
              Het artikel is in uw winkelwagen geplaatst!
            </h3>
          </div>
          <div class="image">
            <v-lazy-image
              :src="product.photo.url"
              :alt="product.photo.alt"
            />
          </div>
          <div class="orderSummary">
            <h4>{{ product.productName }}</h4>
            <span v-if="product.quantity">Hoeveelheid: {{ product.quantity }}</span>
            <span v-else>Hoeveelheid: 1</span>
            <span>Prijs: €{{ product.price }}</span>
          </div>
        </div>
        <div class="col">
          <div class="cartSummary">
            <p>U hebt {{ getProducts }}<span v-if="getProducts === 1">&nbsp;product</span><span v-else>&nbsp;producten</span> in uw winkelwagen</p>
            <p>Totaal: {{ totalPrice }}</p>
            <wr-btn
              block
              medium
              outline
              color="primary"
              @click="hide"
            >
              Doorgaan
            </wr-btn>
            <wr-btn
              block
              medium
              outline
              color="primary"
              @click="goToCart"
            >
              Winkelwagen
            </wr-btn>
            <p>Some text</p>
            <wr-btn
              block
              medium
              color="primary"
              dark
              @click="goToCheckout"
            >
              Afrekenen
            </wr-btn>
          </div>
        </div>
      </div>
      <div class="row">
        <ul class="productList">
          <li class="product">
            <img
              src="test.jpg"
              alt="test"
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import btn from '@/components/ui-components/Button.vue';

export default {
  components: {
    'wr-btn': btn
  },
  props: {
    showModal: {
      type: Boolean,
      default: false
    },
    // eslint-disable-next-line vue/require-default-prop
    product: {
      type: Object
    }
  },
  computed: {
    getProducts() {
      if(this.$store.getters['cart/currentCart']) {
        if (this.$store.getters['cart/currentCart'].products)
          return this.$store.getters['cart/currentCart'].products.length;
        else
          return 0;
      }
      else
        return 0;
    },
    totalPrice() {
      if(this.$store.getters['cart/currentCart']) {
        //return this.$store.getters['cart/currentCart'].price;
        return this.product.price;
      }
      else
        return 0;
    }
  },
  methods: {
    hide() {
      this.$emit('hide');
    },
    goToCart() {
      this.$router.push('/cart');
    },
    goToCheckout() {
      this.$router.push('/cart/checkout');
    }
  }
}
</script>

<style lang="scss" scoped>
.modalBackground {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  background: rgba(0,0,0,0.5);
  z-index: 100;
  overflow-y: auto;
  .modal {
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 0 0 rgba(0,0,0,0.5);
    padding: 4rem;
    margin: auto;
    max-width: 100rem;
    .row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      margin-bottom: 2rem;
      &:last-of-type {
        margin-bottom: 0;
        grid-template-columns: 1fr;
        display: none;
      }
      .col {
        width: 100%;
        border-right: solid 1px rgba(0,0,0,0.2);
        padding: 0 4rem;
        &:last-of-type {
          border-right: none;
        }
        .message {
          width: fit-content;
          display: flex;
          align-items: center;
          h3 {
            margin-left: 2rem;
            white-space: nowrap;
            margin-bottom: 0;
          }
        }
        .image {
          max-width: 25rem;
          margin: 2rem auto;
          img {
            width: 100%;
          }
        }
        .orderSummary {
          text-align: center;
          h4 {
            font-weight: 400;
            font-size: 2rem;
          }
          span {
            display: block;
            font-weight: bold;
          }
        }
        .cartSummary {
          text-align: center;
          margin-top: 4rem;
          button {
            margin: 2rem 0;
          }
        }
      }
    }
  }
}
</style>

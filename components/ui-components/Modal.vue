<template>
  <div
    v-show="showModal"
    class="modalBackground"
    @click.self="hide"
  >
    <div
      class="modal"
    >
      <div class="close">
        <i
          class="material-icons"
          @click="hide"
        >
          close
        </i>
      </div>
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
            <p>
              {{ product.shortDescription }}
            </p>
          </div>
        </div>
        <div class="col">
          <div class="cartSummary">
            <div class="holder">
              <span class="label">
                Hoeveelheid:
              </span>
              <div class="counter">
                <span
                  class="editor minus"
                  @click="removeProduct(cartProduct)"
                >
                  &minus;
                </span>
                <input
                  type="text"
                  name="count"
                  class="count"
                  :value="cartProduct.count"
                  @input="editCart($event.target.value, cartProduct.productId)"
                >
                <span
                  class="editor plus"
                  @click="addProduct(cartProduct.productId)"
                >
                  +
                </span>
              </div>
            </div>
            <div class="holder">
              <span class="label">Prijs per stuk:</span>
              <span class="price">€{{ Number(cartProduct.productPrice).toFixed(2) }}</span>
            </div>
            <div class="holder">
              <span class="label">Totaal:</span>
              <span class="price">
                €{{ (Number(cartProduct.productPrice) * Number(cartProduct.count)).toFixed(2) }}
              </span>
            </div>
            <div class="actions">
              <wr-btn
                block
                medium
                outline
                color="primary"
                @click="goToCart"
              >
                Bekijk winkelwagen
              </wr-btn>
              <wr-btn
                block
                medium
                color="primary"
                dark
                @click="goToCheckout"
              >
                Direct afrekenen
              </wr-btn>
            </div>
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
/* eslint-disable no-param-reassign */
import cloneDeep from 'lodash/cloneDeep';
import btn from './Button.vue';

export default {
  components: {
    'wr-btn': btn,
  },
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
    // eslint-disable-next-line vue/require-default-prop
    product: {
      type: Object,
    },
  },
  data() {
    return {
      cartProduct: {
        count: 0,
      },
    };
  },
  computed: {
    getProducts() {
      if (this.$store.getters['cart/currentCart']) {
        if (this.$store.getters['cart/currentCart'].products) { return this.$store.getters['cart/currentCart'].products.length; }
        return 0;
      }
      return 0;
    },
    totalPrice() {
      if (this.$store.getters['cart/currentCart']) {
        // return this.$store.getters['cart/currentCart'].price;
        return this.product.price;
      }
      return 0;
    },
  },
  mounted() {
    if (this.$store.getters['cart/currentCart']) {
      if (this.$store.getters['cart/currentCart'].products) {
        const currentProduct = this.$store.getters['cart/currentCart'].products.filter((cartProduct) => cartProduct.productId === this.product.id);
        if (currentProduct[0]) {
          // eslint-disable-next-line prefer-destructuring
          this.cartProduct = currentProduct[0];
        }
      }
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
    },
    editCart(value, productId) {
      if (value >= 1) {
        const cart = cloneDeep(this.$store.getters['cart/currentCart']);

        cart.products.map((x) => {
          if (x.productId === productId) {
            x.count = value;
          }
          return x;
        });

        this.$store.dispatch('cart/editCart', cart);
      }
    },
    addProduct(productId) {
      const cart = cloneDeep(this.$store.getters['cart/currentCart']);

      cart.products.map((x) => {
        if (x.productId === productId) {
          x.count += 1;
        }
        return x;
      });

      this.$store.dispatch('cart/editCart', cart);
    },
    removeProduct(product) {
      if (product.count >= 2) {
        const cart = cloneDeep(this.$store.getters['cart/currentCart']);

        cart.products.map((x) => {
          if (x.productId === product.productId) {
            x.count -= 1;
          }
          return x;
        });

        this.$store.dispatch('cart/editCart', cart);
      } else {
        this.deleteProduct(product.productId);
      }
    },
    deleteProduct(productId) {
      const cart = cloneDeep(this.$store.getters['cart/currentCart']);
      cart.products = cart.products.filter((item) => item.productId !== productId);
      this.$store.dispatch('cart/editCart', cart);
    },
  },
};
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
    border-radius: $border-radius;
    box-shadow: 0 2px 0 0 rgba(0,0,0,0.5);
    padding: 4rem;
    margin: auto;
    max-width: 100rem;
    position: relative;
    .close {
      position: absolute;
      right: 1rem;
      top: 1rem;
      cursor: pointer;
      i {
        font-size: 3rem;
      }
    }
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
          display: flex;
          flex-direction: column;
          height: 100%;
          button {
            margin: 2rem 0;
            &:first-of-type {
              margin-top: 0;
            }
            &:last-of-type {
              margin-bottom: 0;
            }
          }
          .holder {
            display: flex;
            align-items: center;
            margin-bottom: 2rem;
            justify-content: space-between;
            .label {
              width: 65%;
              font-size: 1.6rem;
              font-weight: 500;
            }
            .counter {
              position: relative;
              width: 45%;
              input {
                text-align: center;
                padding: 1.6rem;
                background: rgba(0,0,0,0.05);
                border: none;
                border-radius: $border-radius;
                font-size: 1.6rem;
              }
              .count {
                max-width: 15rem;
              }
              .editor {
                position: absolute;
                top: 0;
                padding: 0.5rem 2rem;
                font-size: 3rem;
                font-weight: 200;
                color: rgba(0,0,0,0.2);
                cursor: pointer;
                &:hover {
                  color: rgba(0,0,0,0.9);
                }
              }
              .minus {
                left: 0;
              }
              .plus {
                right: 0;
              }
            }
            .price {
              margin: 1rem 0;
              text-align: right;
              font-size: 1.6rem;
              font-weight: 500;
            }
          }
          .actions {
            margin-top: auto;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 769px) {
  .modalBackground {
    .modal {
      margin-top: 4rem;
      margin-bottom: 4rem;
      height: fit-content;
      .row {
        display: grid;
        grid-template-columns: 1fr;
        margin-bottom: 2rem;
        .col {
          border: none;
          margin-bottom: 4rem;
          &:last-of-type {
            margin-bottom: 0;
          }
          .cartSummary {
            .holder {
              .counter {
                .count {
                  max-width: fit-content;
                }
              }
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 426px) {
  .modalBackground {
    .modal {
      margin: 4rem 2rem;
      .row {
        .col {
          padding: 0;
          .message {
            font-size: 0.9rem;
            max-width: 25rem;
          }
          .cartSummary {
            .holder {
              .counter {
                .count {
                  max-width: 15rem;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>

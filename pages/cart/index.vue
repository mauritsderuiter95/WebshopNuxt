<template>
  <div class="wrapper">
    <div class="cart">
      <h2>Winkelwagen</h2>
      <span
        v-if="!cart[0] || cart[0].count == 0"
        class="message"
      >Uw winkelwagen is momenteel leeg</span>
      <table
        v-if="cart[0] && cart[0].count >= 1"
        class="cartContent"
      >
        <tbody>
          <tr
            v-for="product in cart"
            :key="product.productId"
          >
            <td class="image">
              <div v-if="product.photo">
                <v-lazy-image
                  :src="product.photo.url"
                  :alt="product.photo.alt"
                  class="boxImg"
                />
              </div>
            </td>
            <td class="title">
              <h4>{{ product.productName }}</h4>
            </td>
            <td class="amount itemPrice">
              €{{ Number(product.productPrice).toFixed(2) }}
            </td>
            <td class="counterCol">
              <div class="counter">
                <span
                  class="editor minus"
                  @click="removeProduct(product)"
                >
                  &minus;
                </span>
                <input
                  id="count"
                  type="text"
                  name="count"
                  class="count"
                  :value="product.count"
                  @input="editCart($event.target.value,product.productId)"
                >
                <span
                  class="editor plus"
                  @click="addProduct(product.productId)"
                >
                  +
                </span>
              </div>
            </td>
            <td class="amount">
              €{{ (Number(product.productPrice) * Number(product.count)).toFixed(2) }}
            </td>
            <td
              class="delete"
              @click="deleteProduct(product.productId)"
            >
              <i class="material-icons">
                delete_outline
              </i>
            </td>
          </tr>
        </tbody>
      </table>
      <div
        v-if="cart[0] && cart[0].count >= 1"
        class="toolbar"
      >
        <div class="checkout">
          <nuxt-link to="cart/checkout">
            <wr-btn
              color="primary"
              dark
              medium
              block
            >
              Bestellen
            </wr-btn>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductService from '~/services/product.service.js';
import btn from '@/components/ui-components/Button.vue';

export default {
    components: {
        'wr-btn': btn
    },
    data() {
        return {
            products: [],
        }
    },
    computed: {
      cart() {
            if(this.$store.getters['cart/currentCart'])
                return this.$store.getters['cart/currentCart'].products;
            return [{
                count: 0,
                productId: 0,
                id: 0,
                productName: null,
                photo: {}
            }]
        }
    },
    methods: {
      editCart(value, productId) {
        if(value >= 1) {
          let cart = JSON.parse(JSON.stringify(this.$store.getters['cart/currentCart']));
          for (let key in cart.products) {
            if(cart.products[key].productId === productId)
              cart.products[key].count = value;
          }
          this.$store.dispatch("cart/editCart", cart);
        }
      },
      addProduct(productId){
        let cart = JSON.parse(JSON.stringify(this.$store.getters['cart/currentCart']));
        for (let key in cart.products) {
          if(cart.products[key].productId === productId)
            cart.products[key].count++;
        }
        this.$store.dispatch("cart/editCart", cart);
      },
      removeProduct(product){
        if (product.count >= 2) {
          let cart = JSON.parse(JSON.stringify(this.$store.getters['cart/currentCart']));
          for (let key in cart.products) {
            if(cart.products[key].productId === product.productId)
              cart.products[key].count--;
          }
          this.$store.dispatch("cart/editCart", cart);
        }
        else {
          this.deleteProduct(product.productId);
        }
      },
      deleteProduct(productId){
        let cart = JSON.parse(JSON.stringify(this.$store.getters['cart/currentCart']));
        cart.products = cart.products.filter(item => item.productId !== productId);
        this.$store.dispatch("cart/editCart", cart);
      },
    }
}
</script>

<style lang="scss" scoped>
.cart {
  padding: 10rem;
  border-radius: $border-radius;
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.2);
  margin: 0 auto;
  max-width: 120rem;
  background: #fff;
  display: flex;
  flex-direction: column;
  h2 {
    text-align: center;
    margin-bottom: 5rem;
  }
  .message {
    text-align: center;
    display: block;
    font-size: 3rem;
    margin-bottom: 5rem;
  }
  .cartContent {
    max-width: 120rem;
    width: 100%;
    margin: 0 auto;
    border-collapse: collapse;
    //box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
    display: table;
    font-size: 2rem;
    border-radius: $border-radius;
    background: #fff;
    tr {
      display: flex;
      align-items: center;
      border-bottom: 1px solid rgba(0,0,0,0.2);
      padding: 0 2rem;
      :first-child {
        padding-left: 0;
      }
      &:last-of-type {
        border: none;
      }
      td {
        padding: 2rem 0 2rem 4rem;
        .counter {
          position: relative;
          input {
            text-align: center;
            padding: 2rem;
            background: rgba(0,0,0,0.05);
            border: none;
            border-radius: $border-radius;
            font-size: 2rem;
          }
          .count {
            max-width: 15rem;
          }
          .editor {
            position: absolute;
            top: 0;
            padding: 0.5rem 2rem;
            font-size: 4rem;
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
      }
      .amount {
        min-width: 15rem;
        text-align: right;
      }
      .delete {
        cursor: pointer;
      }
      .title {
        flex-grow: 1;
      }
      .image {
        width: 5rem;
        img {
          width: 100%;
        }
      }
    }
  }
}
.toolbar {
  display: flex;
  justify-content: flex-end;
  max-width: 120rem;
  margin: 5rem 0 0;
  .v-btn {
    margin: 0;
  }
}

@media screen and (max-width: 1025px) {
  .wrapper {
    margin: 2rem;
    .cart {
      padding: 2rem;
      max-width: 90vw;
      .cartContent {
        tr {
          width: 100%;
          display: grid;
          grid-template-columns: 20% auto;
          td {
            padding: 2rem;
          }
          .image {
            display: none;
          }
          .title {
            grid-column: span 1;
            align-self: flex-start;
          }
          .amount {
            grid-column-start: 1;
            grid-row-start: 3;
            align-self: flex-end;
            text-align: left;
          }
          .delete {
            text-align: right;
          }
          .counterCol {
            grid-column: span 2;
            .counter {
              .count {
                max-width: 100%;
                width: 100%;
              }
            }
          }
        }
        .itemPrice {
          display: none;
        }
      }
      .toolbar {
        .checkout {
          width: 100%;
        }
      }
    }
  }
}
</style>



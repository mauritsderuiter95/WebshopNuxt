<template>
  <div class="container">
    <div
      class="topbar"
      @click="expandCart"
    >
      <div class="left">
        <i class="material-icons">
          shopping_cart
        </i>
        <span ref="cartLabel">Bekijk winkelwagen</span>
      </div>
      <div class="right">
        <i
          ref="icon"
          class="material-icons"
        >
          expand_more
        </i>
      </div>
    </div>
    <div class="content">
      <h1>WR Automaten</h1>
      <ul class="breadcrumbs">
        <nuxt-link to="/cart">
          <li class="mobile">
            <i class="material-icons chevron">
              chevron_left
            </i>
            Winkelwagen
          </li>
        </nuxt-link>
        <i class="material-icons chevron">
          chevron_right
        </i>
        <li
          ref="contact"
          class="active"
        >
          <a @click="previousStep">
            Informatie
          </a>
        </li>
        <i class="material-icons chevron">
          chevron_right
        </i>
        <li
          ref="sending"
        >
          Verzending en betaling
        </li>
      </ul>
      <transition
        name="slide"
        mode="out-in"
      >
        <div
          v-if="step1"
          key="step1"
        >
          <div class="contactHeading">
            <h2>
              Contactinformatie
            </h2>
            <h3 v-if="!this.$store.getters['user/isAuthenticated']">
              Hebt u al een account? <a @click="signIn">Inloggen</a>
            </h3>
          </div>
          <div
            class="form"
          >
            <div class="input">
              <input
                id="tel"
                v-model="$v.user.phone.$model"
                type="tel"
                name="tel"
                placeholder="Telefoonnummer*"
              >
            </div>
            <div class="input">
              <input
                id="email"
                v-model="$v.user.email.$model"
                type="email"
                name="email"
                placeholder="E-mailadres*"
              >
            </div>

            <h2 class="title">
              Adres
            </h2>

            <div class="input wide">
              <input
                id="company"
                v-model="user.company"
                type="text"
                name="company"
                placeholder="Bedrijfsnaam"
              >
            </div>

            <div class="input">
              <input
                id="firstname"
                v-model="$v.user.firstName.$model"
                type="text"
                name="firstname"
                placeholder="Voornaam*"
              >
            </div>

            <div class="input">
              <input
                id="lastname"
                v-model="$v.user.lastName.$model"
                type="text"
                name="lastname"
                placeholder="Achternaam*"
              >
            </div>

            <div class="input wide">
              <input
                id="address"
                v-model="$v.user.street.$model"
                type="text"
                name="address"
                placeholder="Adres*"
              >
            </div>
            <div class="input wide">
              <input
                id="address2"
                v-model="user.street2"
                type="text"
                name="address2"
              >
            </div>

            <div class="input">
              <input
                id="postcode"
                v-model="$v.user.zipcode.$model"
                type="text"
                name="postcode"
                placeholder="Postcode*"
              >
            </div>

            <div class="input">
              <input
                id="city"
                v-model="$v.user.city.$model"
                type="text"
                name="city"
                placeholder="Plaats*"
              >
            </div>
            <div
              ref="error"
              class="error"
            />
            <div class="input action desktop">
              <nuxt-link to="/cart">
                <wr-btn
                  medium
                  flat
                >
                  <i class="material-icons">
                    chevron_left
                  </i>
                  Winkelwagen
                </wr-btn>
              </nuxt-link>
            </div>
            <div class="input flex-end action">
              <wr-btn
                color="primary"
                dark
                medium
                type="submit"
                block
                @click="nextStep"
              >
                Verzending en betaling
                <i class="material-icons">
                  chevron_right
                </i>
              </wr-btn>
            </div>
          </div>
        </div>
        <div
          v-else
          key="step2"
        >
          <div class="group summary">
            <div class="row">
              <span class="summaryLabel first">E-mailadres</span>
              <span class="second">{{ user.email }}</span>
              <a
                class="summaryLink"
                @click="previousStep"
              >Wijzigen</a>
            </div>
            <div class="row">
              <span class="summaryLabel first">Adres</span>
              <span class="second">{{ user.street }}, {{ user.zipcode }} {{ user.city }}</span>
              <a
                class="summaryLink"
                @click="previousStep"
              >Wijzigen</a>
            </div>
          </div>

          <div class="contactHeading">
            <h2>
              Verzendmethode
            </h2>
          </div>
          <div
            class="form"
          >
            <div class="group wide">
              <div class="row">
                <input
                  id="sendmethod"
                  v-model="$v.sendmethod.$model"
                  type="radio"
                  name="sendmethod"
                  value="postnl"
                  class="first input-radio"
                  @input="calcCosts"
                >
                <span class="second">PostNL Pakket</span>
                <span>€4,99</span>
              </div>
              <div class="row">
                <input
                  id="sendmethod"
                  v-model="$v.sendmethod.$model"
                  type="radio"
                  name="sendmethod"
                  value="retrieve"
                  class="first input-radio"
                  @input="calcCosts"
                >
                <span class="second">Ophalen</span>
                <span>€0,00</span>
              </div>
            </div>

            <h2 class="title">
              Betaalmethode
            </h2>
            <div class="group wide">
              <div class="row">
                <input
                  id="ideal"
                  v-model="$v.paymethod.$model"
                  type="radio"
                  name="ideal"
                  value="ideal"
                  class="first input-radio"
                >
                <span class="second">Ideal</span>
              </div>
              <div class="row">
                <input
                  id="bank"
                  v-model="$v.paymethod.$model"
                  type="radio"
                  name="bank"
                  value="bank"
                  class="first input-radio"
                >
                <span class="second">Bankoverdracht</span>
              </div>
            </div>

            <div
              ref="error2"
              class="error"
            />

            <div class="input wide action">
              <wr-btn
                color="primary"
                dark
                medium
                type="submit"
                block
                @click="finishOrder"
              >
                Betalen
              </wr-btn>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <aside
      ref="cart"
      class="sidebar"
    >
      <div class="card-content">
        <table class="cart">
          <tbody>
            <tr
              v-for="product in cart"
              :key="product.productName"
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
              <td class="amount">
                €{{ (Number(product.productPrice) * Number(product.count)).toFixed(2) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="subtotal">
        <span>Subtotaal</span>
        <span class="right">€{{ subtotal.toFixed(2) }}</span>
        <span>Verzendkosten</span>
        <span
          ref="sendingcosts"
          class="right"
        >Berekend bij volgende stap</span>
      </div>
      <div class="total">
        <span>Totaal</span>
        <span class="right">€{{ subtotal.toFixed(2) }}</span>
      </div>
    </aside>
  </div>
</template>

<script>
import ProductService from '~/services/product.service.js';
import Button from '@/components/ui-components/Button.vue';
import { required, email } from 'vuelidate/lib/validators'

export default {
    components: {
        'wr-btn': Button
    },
    data() {
      return {
        user: {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          street: "",
          zipcode: "",
          city: ""
        },
        step1: true,
        paymethod: "",
        sendmethod: "",
        cartExpanded: false,
      }
    },
    validations: {
      user: {
        firstName: {
          required
        },
        lastName: {
          required
        },
        email: {
          required,
          email
        },
        phone: {
          required
        },
        street: {
          required
        },
        zipcode: {
          required
        },
        city: {
          required
        }
      },
      paymethod: {
        required
      },
      sendmethod: {
        required
      }
    },
    computed: {
        cart() {
            if(this.$store.getters['cart/currentCart']) {
                return this.$store.getters['cart/currentCart'].products;
            }
            return [{
                count: 0,
                productId: 0,
                id: 0,
                productName: null,
                photo: {}
            }]
        },
        subtotal() {
          let subtotal = 0;
          this.cart.map((item) => {
            subtotal = subtotal + item.productPrice * item.count;
          })
          return subtotal;
        },
    },
    mounted() {
      if (this.$store.getters['user/currentUser']) {
        if (this.$store.getters['user/currentUser'].firstName)
          this.user = JSON.parse(JSON.stringify(this.$store.getters['user/currentUser']));
      }
    },
    methods: {
        signIn() {
            this.$router.push('/account/login?returnpath=cart/checkout')
        },
        nextStep() {
          if (!this.$v.user.$invalid) {
            this.step1 = false;
            this.$refs.contact.classList.remove('active');
            this.$refs.sending.classList.add('active');
            this.$store.dispatch("user/saveGuest", this.user);
          }
          else {
            this.$refs.error.style.display = 'block';
            if (this.$v.user.email.$anyError) {
              this.$refs.error.textContent = 'Het e-mailadres is incorrect.';
              return;
            }
            this.$refs.error.textContent = 'Niet alle vereiste velden zijn correct ingevuld.';
          }
        },
        previousStep() {
          this.step1 = true;
          this.$refs.contact.classList.add('active');
          this.$refs.sending.classList.remove('active');
        },
        calcCosts() {
          if (this.sendmethod === "postnl") {
            console.log('test');
            this.subtotal + 4.99;
            this.$refs.sendingcosts = "€4,99";
          }
          else {
            this.$refs.sendingcosts = "Gratis";
          }
        },
        finishOrder() {
          if (!this.$v.$invalid) {
            this.$refs.error2.style.display = 'none';
            if(this.paymethod === "ideal") {
              this.$axios.$post(`${ this.$axios.defaults.baseURL }/orders`, this.$store.getters['cart/currentCart'])
                .then(res => {
                  window.location = res;
                })
                .catch (err => {
                  console.log(err);
                  console.log(`"cartid":"${ this.$store.getters['cart/currentCart'].id }"`)
                })
            }
          }
          else {
            this.$refs.error2.style.display = 'block';
            this.$refs.error2.textContent = 'Niet alle vereiste velden zijn correct ingevuld.';
          }
        },
        expandCart() {
          this.cartExpanded = !this.cartExpanded;
          if (this.cartExpanded) {
            this.$refs.cart.style.display = 'block';
            this.$refs.icon.classList.add('rotate');
            this.$refs.cartLabel.textContent = 'Verberg winkelwagen';
          }
          else {
            this.$refs.cart.style.display = 'none';
            this.$refs.icon.classList.remove('rotate');
            this.$refs.cartLabel.textContent = 'Bekijk winkelwagen';
          }
        }
    },
    layout: 'checkout'
}
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    width: 100%;
    .topbar {
      display: none;
    }
    .content {
      width: 55%;
      padding-right: 8rem;
      padding-top: 6rem;
      z-index: 1;
      position: relative;
        .breadcrumbs {
          list-style-type: none;
          display: flex;
          margin-top: 2rem;
          align-items: center;
          li {
            margin-right: 1rem;
          }
          .chevron {
            margin-right: 1rem;
          }
          .active {
            font-weight: 600;
          }
          .mobile {
            i {
              display: none;
            }
          }
        }
        h1 {
          font-family: 'Magneto';
          font-weight: 400;
          color: $primary-color;
        }
        h2 {
          margin-top: 4rem;
          margin-bottom: 2rem;
          font-weight: 400;
          font-size: 2rem;
          display: inline-block;
        }
        .contactHeading {
          display: flex;
          justify-content: space-between;
          h3 {
            display: inline-block;
            margin-top: 4.4rem;
            font-size: 1.4rem;
            text-align: right;
            font-weight: 400;
            a {
              cursor: pointer;
              text-decoration: underline;
            }
          }
        }
        .summary {
          margin-top: 4rem;
        }
        .group {
          border-radius: $border-radius;
          box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
          width: 100%;
          padding: 1rem 2rem;
          .row {
            display: flex;
            padding-bottom: 1rem;
            padding-top: 1rem;
            align-items: center;
            &:not(:last-of-type) {
              border-bottom: 1px solid #ddd;
            }
            .first {
              color: rgba(0,0,0,0.65);
              margin-right: 1rem;
            }
            .second {
              flex-grow: 1;
            }
            .summaryLabel {
              width: 10rem;
            }
          }
        }
        .form {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 2rem;
            align-items: center;
            .wide {
              grid-column: span 2;
            }
            .title {
              margin-bottom: 1rem;
              margin-top: 3rem;
            }
            .flex-end {
              justify-content: flex-end
            }
            .action {
              margin-top: 2rem;
              margin-bottom: 6rem;
            }
            .error {
              grid-column: span 2;
              padding: 1.7rem 3rem;
              font-size: 1.8rem;
              background: #FF9494;
              border-radius: $border-radius;
              display: none;
            }
            .label {
                display: flex;
                justify-content: flex-end;
                p {
                    margin-bottom: 0;
                    font-size: 1.4rem;
                }
            }
            .input {
              display: flex;
              input {
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                margin: 0;
                font-variant: tabular-nums;
                list-style: none;
                -webkit-font-feature-settings: 'tnum';
                font-feature-settings: 'tnum';
                position: relative;
                display: inline-block;
                width: 100%;
                height: 32px;
                padding: 3rem;
                font-size: 1.8rem;
                line-height: 1.5;
                background-color: #fff;
                background-image: none;
                box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
                border: none;
                border-radius: $border-radius;
                -webkit-transition: all .3s;
                transition: all .3s;
                &::placeholder{
                  color: rgba(0,0,0,0.65);
                }
              }
            }
            .input-radio {
              width: 18px;
              height: 18px;
              -webkit-box-shadow: 0 0 0 0 #2d2d2d inset;
              box-shadow: 0 0 0 0 #2d2d2d inset;
              -webkit-transition: all 0.2s ease-in-out;
              transition: all 0.2s ease-in-out;
              position: relative;
              cursor: pointer;
              vertical-align: -4px;
              border: 1px solid;
              border-radius: 50%;
              appearance: none;
              &:checked {
                border: none;
                box-shadow: 0 0 0 6px #2d2d2d inset;
              }
            }
        }
    }
    .sidebar {
      width: 45%;
      position: relative;
      padding-left: 6rem;
      border-left: 1px solid #ddd;
      padding-top: 4rem;
      z-index: 3;
      &::after {
        background: #fff;
        left: 0;
        content: "";
        width: 100vw;
        height: 100%;
        position: absolute;
        top: 0;
        z-index: -1;
      }
      .subtotal {
        display: grid;
        margin-top: 4rem;
        padding-bottom: 4rem;
        border-bottom: 1px solid #ddd;
        grid-template-columns: 1fr 1fr;
        font-size: 1.6rem;
        grid-row-gap: 1rem;
      }
      .total {
        display: grid;
        margin-top: 4rem;
        padding-bottom: 4rem;
        grid-template-columns: 1fr 1fr;
        font-size: 2rem;
      }
      .right {
          text-align: right;
          font-weight: 500;
        }
      .cart {
        width: 100%;
        border-collapse: collapse;
        display: table;
        font-size: 1.6rem;
        tr {
          display: flex;
          border-bottom: 1px solid #ddd;
          align-items: center;
          :first-child {
            padding-left: 0;
          }
          td {
            padding: 2rem 0 2rem 4rem;
          }
          .title {
            flex-grow: 1;
            h4 {
              font-weight: 400;
            }
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
}

@media screen and (max-width: 1025px) {
  .content {
    padding-left: 6rem;
  }
  .sidebar {
    padding-right: 6rem;
  }
}

@media screen and (max-width: 769px) {
  .container {
    flex-direction: column;
    .topbar {
      padding: 1rem 2rem;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      z-index: 4;
      margin-top: 5.2rem;
      .left {
        display: flex;
        align-items: center;
        i {
          font-size: 3rem;
          margin-right: 2rem;
        }
      }
      i {
        font-size: 5rem;
        transition: transform .2s;
      }
      .rotate {
        transform: rotateX(180deg);
      }
    }
    .content {
      width: 100%;
      padding-left: 6rem;
    }
    .sidebar {
      display: none;
      position: absolute;
      width: 100%;
      min-height: 100vh;
      height: 100%;
      box-shadow: $box-shadow;
      top: 9rem;
    }
  }
}

@media screen and (max-width: 426px) {
  .container {
    .content {
      padding: 3rem;
      .breadcrumbs {
        .chevron {
          display: none;
        }
        .mobile {
          display: flex;
          align-items: center;
          cursor: pointer;
          .chevron {
            display: initial;
          }
        }
        li {
          display: none;
        }
      }
      .contactHeading {
        flex-wrap: wrap;
        h2 {
          display: block;
        }
        h3 {
          display: block;
          margin-top: 0;
          margin-bottom: 2rem;
        }
      }
      .form {
        display: flex;
        flex-wrap: wrap;
        .input {
          width: 100%;
          margin-bottom: 2rem;
        }
        .desktop {
          display: none;
        }
      }
      .summary {
        .row {
          flex-direction: column;
          align-items: flex-start;
          .summaryLink {
            display: none;
          }
        }
      }
    }
  }
}

.slide-leave-active,
.slide-enter-active {
  transition: .5s;
  opacity: 1;
}
.slide-enter {
  transform: translate(100%, 0);
  opacity: 0;
}
.slide-leave-to {
  transform: translate(-100%, 0);
  opacity: 0;
}
</style>

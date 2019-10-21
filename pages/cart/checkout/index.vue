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
          <a @click="() => previousStep($refs['contact'], $refs['sending'])">
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
          v-if="state.step1"
          key="step1"
        >
          <ValidationObserver ref="step1Observer">
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
                <ValidationProvider v-slot="provider" rules="required" class="provider">
                  <input
                    id="tel"
                    v-model="state.user.phone"
                    type="tel"
                    name="tel"
                    placeholder="Telefoonnummer*"
                  >
                  <span v-if="!provider.errors[0] && provider.untouched">
                &nbsp;
                  </span>
                  <span v-else-if="provider.errors[0]" class="fail">
                    <popper
                      trigger="hover"
                      :options="{
                        placement: 'top',
                        modifiers: { offset: { offset: '0,20px' } }
                      }"
                    >
                      <div class="popper">
                        {{ provider.errors[0] }}
                      </div>

                      <i slot="reference" class="material-icons">
                        error_outline
                      </i>
                    </popper>
                  </span>
                  <span v-else>
                    <i class="material-icons">
                      check
                    </i>
                  </span>
                </ValidationProvider>
              </div>
              <div class="input">
                <ValidationProvider v-slot="provider" rules="required|email" class="provider">
                  <input
                    id="email"
                    v-model="state.user.username"
                    type="email"
                    name="email"
                    placeholder="E-mailadres*"
                  >
                  <span v-if="!provider.errors[0] && provider.untouched">
                &nbsp;
                  </span>
                  <span v-else-if="provider.errors[0]" class="fail">
                    <popper
                      trigger="hover"
                      :options="{
                        placement: 'top',
                        modifiers: { offset: { offset: '-60px, 20px' } }
                      }"
                    >
                      <div class="popper">
                        {{ provider.errors[0] }}
                      </div>

                      <i slot="reference" class="material-icons">
                        error_outline
                      </i>
                    </popper>
                  </span>
                  <span v-else>
                    <i class="material-icons">
                      check
                    </i>
                  </span>
                </ValidationProvider>
              </div>

              <h2 class="title">
                Adres
              </h2>

              <div class="input wide">
                <ValidationProvider v-slot="provider" rules="" class="provider">
                  <input
                    id="company"
                    v-model="state.user.company"
                    type="text"
                    name="company"
                    placeholder="Bedrijfsnaam"
                  >
                  <span v-if="!provider.errors[0] && provider.untouched">
                &nbsp;
                  </span>
                  <span v-else-if="provider.errors[0]" class="fail">
                    <popper
                      trigger="hover"
                      :options="{
                        placement: 'top',
                        modifiers: { offset: { offset: '-60px, 20px' } }
                      }"
                    >
                      <div class="popper">
                        {{ provider.errors[0] }}
                      </div>

                      <i slot="reference" class="material-icons">
                        error_outline
                      </i>
                    </popper>
                  </span>
                  <span v-else>
                    <i class="material-icons">
                      check
                    </i>
                  </span>
                </ValidationProvider>
              </div>

              <div class="input">
                <ValidationProvider v-slot="provider" rules="required" class="provider">
                  <input
                    id="firstname"
                    v-model="state.user.firstName"
                    type="text"
                    name="firstname"
                    placeholder="Voornaam*"
                  >
                  <span v-if="!provider.errors[0] && provider.untouched">
                    &nbsp;
                  </span>
                  <span v-else-if="provider.errors[0]" class="fail">
                    <popper
                      trigger="hover"
                      :options="{
                        placement: 'top',
                        modifiers: { offset: { offset: '0,20px' } }
                      }"
                    >
                      <div class="popper">
                        {{ provider.errors[0] }}
                      </div>

                      <i slot="reference" class="material-icons">
                        error_outline
                      </i>
                    </popper>
                  </span>
                  <span v-else>
                    <i class="material-icons">
                      check
                    </i>
                  </span>
                </ValidationProvider>
              </div>

              <div class="input">
                <ValidationProvider v-slot="provider" rules="required" class="provider">
                  <input
                    id="lastname"
                    v-model="state.user.lastName"
                    type="text"
                    name="lastname"
                    placeholder="Achternaam*"
                  >
                  <span v-if="!provider.errors[0] && provider.untouched">
                    &nbsp;
                  </span>
                  <span v-else-if="provider.errors[0]" class="fail">
                    <popper
                      trigger="hover"
                      :options="{
                        placement: 'top',
                        modifiers: { offset: { offset: '-60px, 20px' } }
                      }"
                    >
                      <div class="popper">
                        {{ provider.errors[0] }}
                      </div>

                      <i slot="reference" class="material-icons">
                        error_outline
                      </i>
                    </popper>
                  </span>
                  <span v-else>
                    <i class="material-icons">
                      check
                    </i>
                  </span>
                </ValidationProvider>
              </div>

              <div class="input wide">
                <ValidationProvider v-slot="provider" rules="required" class="provider">
                  <input
                    id="address"
                    v-model="state.user.street"
                    type="text"
                    name="address"
                    placeholder="Adres*"
                  >
                  <span v-if="!provider.errors[0] && provider.untouched">
                &nbsp;
                  </span>
                  <span v-else-if="provider.errors[0]" class="fail">
                    <popper
                      trigger="hover"
                      :options="{
                        placement: 'top',
                        modifiers: { offset: { offset: '-60px, 20px' } }
                      }"
                    >
                      <div class="popper">
                        {{ provider.errors[0] }}
                      </div>

                      <i slot="reference" class="material-icons">
                        error_outline
                      </i>
                    </popper>
                  </span>
                  <span v-else>
                    <i class="material-icons">
                      check
                    </i>
                  </span>
                </ValidationProvider>
              </div>

              <div class="input wide">
                <ValidationProvider v-slot="provider" rules="" class="provider">
                  <input
                    id="address2"
                    v-model="state.user.street2"
                    type="text"
                    name="address2"
                  >
                  <span v-if="!provider.errors[0] && provider.untouched">
                &nbsp;
                  </span>
                  <span v-else-if="provider.errors[0]" class="fail">
                    <popper
                      trigger="hover"
                      :options="{
                        placement: 'top',
                        modifiers: { offset: { offset: '-60px, 20px' } }
                      }"
                    >
                      <div class="popper">
                        {{ provider.errors[0] }}
                      </div>

                      <i slot="reference" class="material-icons">
                        error_outline
                      </i>
                    </popper>
                  </span>
                  <span v-else>
                    <i class="material-icons">
                      check
                    </i>
                  </span>
                </ValidationProvider>
              </div>

              <div class="input">
                <ValidationProvider v-slot="provider" rules="required" class="provider">
                  <input
                    id="postcode"
                    v-model="state.user.zipcode"
                    type="text"
                    name="postcode"
                    placeholder="Postcode*"
                  >
                  <span v-if="!provider.errors[0] && provider.untouched">
                &nbsp;
                  </span>
                  <span v-else-if="provider.errors[0]" class="fail">
                    <popper
                      trigger="hover"
                      :options="{
                        placement: 'top',
                        modifiers: { offset: { offset: '0,20px' } }
                      }"
                    >
                      <div class="popper">
                        {{ provider.errors[0] }}
                      </div>

                      <i slot="reference" class="material-icons">
                        error_outline
                      </i>
                    </popper>
                  </span>
                  <span v-else>
                    <i class="material-icons">
                      check
                    </i>
                  </span>
                </ValidationProvider>
              </div>

              <div class="input">
                <ValidationProvider v-slot="provider" rules="required" class="provider">
                  <input
                    id="city"
                    v-model="state.user.city"
                    type="text"
                    name="city"
                    placeholder="Plaats*"
                  >
                  <span v-if="!provider.errors[0] && provider.untouched">
                &nbsp;
                  </span>
                  <span v-else-if="provider.errors[0]" class="fail">
                    <popper
                      trigger="hover"
                      :options="{
                        placement: 'top',
                        modifiers: { offset: { offset: '-60px, 20px' } }
                      }"
                    >
                      <div class="popper">
                        {{ provider.errors[0] }}
                      </div>

                      <i slot="reference" class="material-icons">
                        error_outline
                      </i>
                    </popper>
                  </span>
                  <span v-else>
                    <i class="material-icons">
                      check
                    </i>
                  </span>
                </ValidationProvider>
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
                  @click="() => nextStep()"
                >
                  Verzending en betaling
                  <i class="material-icons">
                    chevron_right
                  </i>
                </wr-btn>
              </div>
            </div>
          </ValidationObserver>
        </div>
        <div
          v-else
          key="step2"
        >
          <ValidationObserver ref="step2Observer">
            <div class="group summary">
              <div class="row">
                <span class="summaryLabel first">E-mailadres</span>
                <span class="second">{{ state.user.username }}</span>
                <a
                  class="summaryLink"
                  @click="() => previousStep()"
                >Wijzigen</a>
              </div>
              <div class="row">
                <span class="summaryLabel first">Adres</span>
                <span class="second">
                  {{ state.user.street }}, {{ state.user.zipcode }} {{ state.user.city }}
                </span>
                <a
                  class="summaryLink"
                  @click="() => previousStep()"
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
                <ValidationProvider rules="required">
                  <div class="row">
                    <input
                      v-model="state.sendMethod"
                      type="radio"
                      name="sendmethod"
                      value="postnl"
                      class="first input-radio"
                      @input="() => calcCosts(true)"
                    >
                    <span class="second">PostNL Pakket</span>
                    <span>€4,99</span>
                  </div>
                  <div class="row">
                    <input
                      v-model="state.sendMethod"
                      type="radio"
                      name="sendmethod"
                      value="retrieve"
                      class="first input-radio"
                      @input="() => calcCosts(false)"
                    >
                    <span class="second">Ophalen</span>
                    <span>€0,00</span>
                  </div>
                </ValidationProvider>
              </div>

              <h2 class="title">
                Betaalmethode
              </h2>
              <div class="group wide">
                <ValidationProvider rules="required">
                  <div class="row">
                    <input
                      id="ideal"
                      v-model="state.payMethod"
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
                      v-model="state.payMethod"
                      type="radio"
                      name="bank"
                      value="bank"
                      class="first input-radio"
                    >
                    <span class="second">Bankoverdracht</span>
                  </div>
                </ValidationProvider>
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
                  @click="() => finishOrder($refs['step2'], $refs['error2'])"
                >
                  Betalen
                </wr-btn>
              </div>
            </div>
          </ValidationObserver>
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
              v-for="product in state.cart.products"
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
        <span class="right">€{{ Number(state.subtotal).toFixed(2) }}</span>
        <span>Verzendkosten</span>
        <span
          ref="sendingCosts"
          class="right"
        >Berekend bij volgende stap</span>
      </div>
      <div class="total">
        <span>Totaal</span>
        <span class="right">€{{ Number(state.total).toFixed(2) }}</span>
      </div>
    </aside>
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api';
import { ValidationObserver } from 'vee-validate';
import Button from '../../../components/ui-components/Button.vue';
import setup from './setup';
import 'vue-popperjs/dist/vue-popper.css';
import '../../../assets/scss/_form.scss';

const popper = require('vue-popperjs');

export default createComponent({
  components: {
    'wr-btn': Button,
    ValidationObserver,
    popper,
  },
  setup,
  layout: 'checkout',
});
</script>

<style lang="scss" scoped src="./style.scss">
</style>

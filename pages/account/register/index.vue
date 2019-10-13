<template>
  <div class="container">
    <div class="box small">
      <h2>Inloggen</h2>
      <p>Al een account?</p>
      <nuxt-link to="/account/login">
        <wr-btn
          primary
          block
          dark
          color="primary"
          big
        >
          Inloggen
        </wr-btn>
      </nuxt-link>
    </div>
    <div class="box">
      <h2>Registreren</h2>
      <validation-observer ref="observer">
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
                    modifiers: { offset: { offset: '0,10px' } }
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
                    modifiers: { offset: { offset: '0,10px' } }
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
            <ValidationProvider
              v-slot="provider"
              rules="required|min:7"
              class="provider"
              vid="password"
            >
              <input
                id="password"
                v-model="state.user.password"
                type="password"
                name="password"
                placeholder="Wachtwoord*"
              >
              <span v-if="!provider.errors[0] && provider.untouched">
                &nbsp;
              </span>
              <span v-else-if="provider.errors[0]" class="fail">
                <popper
                  trigger="hover"
                  :options="{
                    placement: 'top',
                    modifiers: { offset: { offset: '0,10px' } }
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
            <ValidationProvider
              v-slot="provider"
              :rules="{is:state.user.password, required: true}"
              class="provider"
            >
              <input
                id="password2"
                v-model="state.password2"
                type="password"
                name="password2"
                placeholder="Herhaal wachtwoord*"
              >
              <span v-if="!provider.errors[0] && provider.untouched">
                &nbsp;
              </span>
              <span v-else-if="provider.errors[0]" class="fail">
                <popper
                  trigger="hover"
                  :options="{
                    placement: 'top',
                    modifiers: { offset: { offset: '0,10px' } }
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
                    modifiers: { offset: { offset: '0,10px' } }
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
                    modifiers: { offset: { offset: '0,10px' } }
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
                    modifiers: { offset: { offset: '0,10px' } }
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
                    modifiers: { offset: { offset: '0,10px' } }
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
                    modifiers: { offset: { offset: '0,10px' } }
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
                    modifiers: { offset: { offset: '0,10px' } }
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
                    modifiers: { offset: { offset: '0,10px' } }
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
        </div>
        <div class="bottom">
          <wr-btn
            primary
            block
            dark
            color="primary"
            big
            @click="() => signUp($refs['observer'],$refs['error'])"
          >
            Registreren
          </wr-btn>
        </div>
      </validation-observer>
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api';
import { ValidationObserver } from 'vee-validate';
import Button from '../../../components/ui-components/Button.vue';
import setup from './setup';
import 'vue-popperjs/dist/vue-popper.css';
import '../../../assets/scss/_form.scss';

const Popper = require('vue-popperjs');

export default createComponent({
  components: {
    'wr-btn': Button,
    ValidationObserver,
    popper: Popper,
  },
  setup,
  middleware: 'authTrue',
});
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  max-width: 120rem;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-column-gap: 6rem;
  .box {
    padding: 10rem;
    padding-right: 6rem;
    border-radius: $border-radius;
    box-shadow: 0 0 2rem rgba(0, 0, 0, 0.2);
    background: #fff;
    &.small {
      padding: 10rem 5rem 5rem;
      display: flex;
      flex-direction: column;
      height: fit-content;
      p {
        margin: 2rem 0;
      }
    }
    .bottom {
      width: calc(100% - 40px);
    }
    .form {
      display: flex;
      flex-direction: column;
      margin-top: 2rem;
      .input, .title {
        width: 100%;
        margin-bottom: 2rem;
      }
      .error {
        width: calc(100% - 40px);
        margin-right: 40px;
        margin-bottom: 2rem;
      }
    }
  }
}


</style>

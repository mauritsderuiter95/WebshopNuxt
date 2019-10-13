<template>
  <div>
    <Box title="Gegevens wijzigen">
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
            <ValidationProvider v-slot="provider" rules="min:7" class="provider" vid="password">
              <input
                id="password"
                v-model="state.user.password"
                type="password"
                name="password"
                placeholder="Wachtwoord (alleen invoeren bij wijzigen)"
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
              :rules="{is:state.user.password, required:state.user.password.length >= 1}"
              class="provider"
            >
              <input
                id="password2"
                v-model="state.password2"
                type="password"
                name="password2"
                placeholder="Herhaal wachtwoord"
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
          <div class="input action desktop">
            <nuxt-link to="/account">
              <wr-btn
                medium
                flat
              >
                <i class="material-icons">
                  chevron_left
                </i>
                Terug
              </wr-btn>
            </nuxt-link>
          </div>
          <div class="input flex-end action">
            <wr-btn
              color="primary"
              dark
              medium
              type="submit"
              @click="() => postData($refs['observer'])"
            >
              Opslaan &nbsp;
              <i class="material-icons">
                save
              </i>
            </wr-btn>
          </div>
        </div>
      </validation-observer>
    </Box>
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api';
import { ValidationObserver } from 'vee-validate';
import Box from '../../../components/ui-components/Box.vue';
import Button from '../../../components/ui-components/Button.vue';
import setup from './setup';
import 'vue-popperjs/dist/vue-popper.css';
import '../../../assets/scss/_form.scss';

const Popper = require('vue-popperjs');

export default createComponent({
  components: {
    Box,
    'wr-btn': Button,
    ValidationObserver,
    popper: Popper,
  },
  setup,
});
</script>

<style lang="scss" scoped>
  .action {
    display: flex;
    align-items: center;
  }
</style>

<style lang="scss">
.popper[x-placement^="top"] .popper__arrow {
  border-width: 10px 10px 0 10px;
  border-color: #FF9494 transparent transparent transparent;
  bottom: -10px;
  right: calc(50% + 10px);
}
</style>

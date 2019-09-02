<template>
  <div>
    <Box title="Gegevens wijzigen">
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
            v-model="$v.user.username.$model"
            type="email"
            name="email"
            placeholder="E-mailadres*"
          >
        </div>
        <div class="input">
          <input
            id="password"
            v-model="$v.user.password.$model"
            type="password"
            name="password"
            placeholder="Wachtwoord (alleen invoeren bij wijzigen)"
          >
        </div>
        <div class="input">
          <input
            id="password2"
            v-model="password2"
            type="password"
            name="password2"
            placeholder="Herhaal wachtwoord"
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
            @click="postData"
          >
            Opslaan &nbsp;
            <i class="material-icons">
              save
            </i>
          </wr-btn>
        </div>
      </div>
    </Box>
  </div>
</template>

<script>
import Box from '@/components/ui-components/Box.vue';
import Button from '@/components/ui-components/Button.vue';
import { required, email, numeric } from 'vuelidate/lib/validators';

export default {
  components: {
    Box,
    'wr-btn': Button,
  },
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        username: "",
        phone: "",
        street: "",
        zipcode: "",
        city: "",
        password: "",
      },
      password2: ""
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
      username: {
        required,
        email
      },
      phone: {
        required,
        numeric
      },
      password: {
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
  },
  mounted() {
    if (this.$store.getters['user/currentUser']) {
      if (this.$store.getters['user/currentUser'].firstName)
        this.user = JSON.parse(JSON.stringify(this.$store.getters['user/currentUser']));
    }
  },
  methods: {
    postData() {
      if (this.$v.user.$invalid) {
        this.$refs.error.style.display = 'block';
          if (this.$v.user.username.$anyError) {
            this.$refs.error.textContent = 'Het e-mailadres is incorrect.';
            return;
          }
          this.$refs.error.textContent = 'Niet alle vereiste velden zijn correct ingevuld.';
          return;
      }
      if (this.password2 !== this.user.password) {
        this.$refs.error.style.display = 'block';
        this.$refs.error.textContent = 'De wachtwoorden komen niet overeen.';
        return;
      }
      const jsonPatchDocument = [];
      let jsonPatch = {};

      Object.entries(this.user).forEach(([key, val]) => {

        if (val !== (this.$store.getters['user/currentUser'])[key]) {
          jsonPatch = {
            op: 'replace',
            path: `/${ key }`,
            value: val,
          };
          jsonPatchDocument.push(jsonPatch);
        }
      });

      console.log(jsonPatchDocument);

      this.$axios.$patch(`${ this.$axios.defaults.baseURL }/users/${ this.user.id }`, jsonPatchDocument)
        .then((res) => {
          this.$store.dispatch("user/setUser", res);
          this.$router.push('/account');
        });
    }
  }
}
</script>

<style lang="scss" scoped>
  .action {
    display: flex;
    align-items: center;
  }
</style>

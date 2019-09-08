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
            placeholder="Wachtwoord*"
          >
        </div>
        <div class="input">
          <input
            id="password2"
            v-model="$v.user.password2.$model"
            type="password"
            name="password2"
            placeholder="Herhaal wachtwoord*"
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
      </div>
      <div class="bottom">
        <wr-btn
          primary
          block
          dark
          color="primary"
          big
          @click="signUp"
        >
          Registreren
        </wr-btn>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "~/components/ui-components/Button.vue";
import { required, email, numeric, sameAs } from 'vuelidate/lib/validators';

export default {
	components: {
		"wr-btn": Button
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
        password2: "",
      },
		};
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
        required
      },
      password2: {
        required,
        sameAsPassword: sameAs('password'),
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
	methods: {
		signUp() {
      if (this.$v.user.$invalid) {
        this.$refs.error.style.display = 'block';
        if (this.$v.user.username.$anyError) {
          this.$refs.error.textContent = 'Het e-mailadres is incorrect.';
          return;
        }
        if (this.$v.user.password2.$anyError) {
          this.$refs.error.textContent = 'De wachtwoorden komen niet overeen.';
          return;
        }
        this.$refs.error.textContent = 'Niet alle vereiste velden zijn correct ingevuld.';
        return;
      }
      this.$axios.$post(`${ this.$axios.defaults.baseURL }/users`, this.user)
        .then((res) => {
          this.$router.push('/account/register/result');
        })
        .catch((e) => {
          this.$refs.error.style.display = 'block';
          if (e.response) {
            if (e.response.data)
              this.$refs.error.textContent = e.response.data.message;
            else
              this.$refs.error.textContent = e.response.data;
          }
          else
            this.$refs.error.textContent = 'Er ging iets mis. Neem contact op met de leverancier.';
        })
    }
	},
	middleware: "authTrue"
};
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
		.form {
			display: flex;
			flex-direction: column;
			margin-top: 2rem;
      .input, .title {
        width: 100%;
        margin-bottom: 2rem;
      }
      .error {
        width: 100%;
        margin-bottom: 2rem;
      }
		}
	}
}
</style>


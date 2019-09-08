<template>
  <div class="container">
    <div class="box">
      <h2>Inloggen</h2>
      <div class="form">
        <div class="input">
          <input
            id="email"
            v-model="email"
            type="email"
            name="email"
            placeholder="E-mailadres"
          >
        </div>
        <div class="input">
          <input
            id="password"
            v-model="password"
            type="password"
            name="password"
            placeholder="Wachtwoord"
            @keyup.enter="login"
          >
        </div>
        <div
          ref="error"
          class="error"
        />
        <wr-btn
          primary
          block
          dark
          color="primary"
          big
          @click="login"
        >
          Inloggen
        </wr-btn>
      </div>
    </div>
    <div class="box small">
      <h2>Registreren</h2>
      <p>Door te registreren kan je sneller winkelen, overzichtelijk je vorige bestellingen zien en de status van je laatste bestelling opvragen.</p>
      <div class="bottom">
        <nuxt-link to="/account/register">
          <wr-btn
            primary
            block
            dark
            color="primary"
            big
          >
            Registreren
          </wr-btn>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "~/components/ui-components/Button.vue";

export default {
	components: {
		"wr-btn": Button
	},
	data() {
		return {
			email: null,
			password: null
		};
	},
	methods: {
		login() {
			let auth = {
				username: this.email,
        password: this.password,
        isLogin: true
			};
			this.$store
				.dispatch("user/authenticateUser", auth)
				.then(result => {
					if (!this.$route.query.returnpath)
						this.$router.push("/account");
					else this.$router.push(`/${this.$route.query.returnpath}`);
				})
				.catch(e => {
					this.email = null;
          this.password = null;
          this.$refs.error.style.display = 'block';
          this.$refs.error.textContent = 'Gebruikersnaam of wachtwoord is incorrect';
				});
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
	grid-template-columns: 2fr 1fr;
	grid-column-gap: 6rem;
	.box {
		padding: 10rem;
		border-radius: $border-radius;
		box-shadow: 0 0 2rem rgba(0, 0, 0, 0.2);
		background: #fff;
    &.small {
      padding: 10rem 5rem;
      display: flex;
      flex-direction: column;
      p {
        margin-top: 2rem;
      }
      .bottom {
        margin-top: auto;
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


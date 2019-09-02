<template>
  <div class="container">
    <div class="box">
      <h2>Inloggen</h2>
      <form
        action=""
        class="form"
      >
        <div class="input-group">
          <label for="email">E-mailadres</label>
          <input
            id="email"
            v-model="email"
            type="email"
            name="email"
          >
        </div>
        <div class="input-group">
          <label for="password">Wachtwoord</label>
          <input
            id="password"
            v-model="password"
            type="password"
            name="password"
          >
        </div>
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
      </form>
    </div>
    <div class="box small">
      <h2>Registreren</h2>
      <p>Door te registreren kan je sneller winkelen, overzichtelijk je vorige bestellingen zien en de status van je laatste bestelling opvragen.</p>
      <div class="bottom">
        <wr-btn
          primary
          block
          dark
          color="primary"
          big
        >
          Registreren
        </wr-btn>
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
          console.log(auth)
					this.email = null;
					this.password = null;
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
			.input-group {
				display: grid;
				margin-bottom: 3rem;
				grid-template-columns: 1fr 2fr;
				grid-column-gap: 2rem;
        width: 100%;
				label {
					font-size: 1.8rem;
					align-self: center;
				}
				input {
					border-radius: $border-radius;
					padding: 1rem 2rem;
					font-size: 1.8rem;
					border: 1px solid rgba(0, 0, 0, 0.2);
				}
			}
		}
	}
}
</style>


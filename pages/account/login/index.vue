<template>
    <div class="container">
        <div class="box">
            <h2>Inloggen</h2>
            <form action="" class="form">
                <div class="input-group">
                    <label for="email">E-mailadres</label>
                    <input type="email" name="email" id="email" v-model="email" />
                </div>
                <div class="input-group">
                    <label for="password">Wachtwoord</label>
                    <input type="password" name="password" id="password"  v-model="password"/>
                </div>
                <wr-btn primary block dark color="primary" big @click="login">Test</wr-btn>
            </form>
        </div>
        <div class="box">
            <h2>Registreren</h2>
            <p>Voordelen Registreren:</p>
            <ul>
                <li>Punt 1</li>
                <li>Punt 2</li>
                <li>Punt 3</li>
            </ul>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            <wr-btn primary block dark color="primary" big>Test</wr-btn>
        </div>
    </div>
</template>

<script>
import Button from '~/components/ui-components/Button.vue'

export default {
    components: {
        'wr-btn': Button
    },
    data() {
        return {
            email: null,
            password: null
        }
    },
    methods: {
        login() {
            let auth = {
                username: this.email,
                password: this.password
            }
            this.$store.dispatch('user/authenticateUser', this.auth)
                .then ((result) => {
                    if(!this.$route.query.returnpath)
                        this.$router.push('/account');
                    else
                        this.$router.push(`/${this.$route.query.returnpath}`)
                })
                .catch((e) => {
                    this.email = null;
                    this.password = null;
                });
        }
    },
    middleware: 'authTrue'
}
</script>

<style lang="scss" scoped>
.container {
    margin: 0 auto;
    max-width: 120rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 6rem; 
    .box {
        padding: 10rem;
        border-radius: 1rem;
        box-shadow: 0 0 2rem rgba(0, 0, 0, 0.2);
        background: #fff;
        .form {
            display: flex;
            flex-direction: column;
            margin-top: 2rem;
            .input-group {
                display: grid;
                margin-bottom: 3rem;
                grid-template-columns: 1fr 2fr;
                grid-column-gap: 2rem; 
                label {
                    font-size: 1.8rem;
                    align-self: center;
                }
                input {
                    border-radius: 4px;
                    padding: 1rem 2rem;
                    font-size: 1.8rem;
                    border: 1px solid rgba(0, 0, 0, 0.2);
                }
            }
        }
    }
}
</style>


<template>
    <div class="container">
        <div class="credentialGuard" v-if="this.$store.getters['user/isAuthenticated'] || guest">
            <div class="box guest">
                <h2>Gast</h2>
                <p>U kunt afrekenen als gast. Hierbij kunt u niet online uw bestellingen inzien of volgen.</p>
                <div class="footer">
                    <a-button type="primary" @click="enterGuest">Afrekenen als gast</a-button>
                </div>
            </div>
            <div class="box signIn">
                <h2>Log in</h2>
                <p>Log in om deze bestelling toe te voegen aan uw account.</p>
                <div class="footer">
                    <a-button type="primary" @click="signIn">Log in</a-button>
                </div>
            </div>
            <div class="box signUp">
                <h2>Maak account aan</h2>
                <p>Maak een account aan om van allerlei voordelen te genieten. Zoals het volgen van uw bestellingen, deze online inzien en kortingsacties</p>
                <div class="footer">
                    <a-button type="primary" @click="signUp">Maak account aan</a-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Button } from 'ant-design-vue';

export default {
    components: {
        'a-button': Button
    },
    data() {
        return {
            guest: false
        }
    },
    methods: {
        enterGuest() {
            this.guest = true;
        },
        signIn() {
            this.$router.push('/account/login?returnpath=cart/checkout')
        },
        signUp() {
        }
    }
}
</script>

<style lang="scss" scoped>
.credentialGuard {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    .box {
        margin: 1rem;
        background: #fff;
        border: 1px solid #e8e8e8;
        border-radius: 2px;
        padding: 2.4rem;
        display: flex;
        flex-direction: column;
        transition: all 0.3s;
        &:hover {
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
            border-color: rgba(0, 0, 0, 0.09);
        }
        .footer {
            margin-top: auto;
        }
    }
}
</style>

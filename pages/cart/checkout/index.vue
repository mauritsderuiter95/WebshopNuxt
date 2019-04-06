<template>
    <div class="container">
        <div class="content">
            <div class="credentialGuard" v-if="!this.$store.getters['user/isAuthenticated'] || guest">
                <v-card class="guest">
                    <v-card-title primary-title>
                        <div>
                            <h3>Gast</h3>
                            <p>U kunt afrekenen als gast. Hierbij kunt u niet online uw bestellingen inzien of volgen.</p>
                        </div>
                    </v-card-title>
                    <v-card-actions>
                        <v-btn color="primary" block @click="enterGuest">Afrekenen als gast</v-btn>
                    </v-card-actions>
                </v-card>
                <v-card class="signIn">
                    <v-card-title primary-title>
                        <div>
                            <h3>Log in</h3>
                            <p>Log in om deze bestelling toe te voegen aan uw account.</p>
                        </div>
                    </v-card-title>
                    <v-card-actions>
                        <v-btn color="primary" block @click="signIn">Log in</v-btn>
                    </v-card-actions>
                </v-card>
                <v-card class="signUp">
                    <v-card-title primary-title>
                        <div>
                            <h3>Maak account aan</h3>
                            <p>Maak een account aan om van allerlei voordelen te genieten. Zoals het volgen van uw bestellingen, deze online inzien en kortingsacties.</p>
                        </div>
                    </v-card-title>
                    <v-card-actions>
                        <v-btn color="primary" block @click="signUp">Maak account aan</v-btn>
                    </v-card-actions>
                </v-card>
            </div>
            <div class="form" v-if="!guest">
                <div class="label">
                    <p>Voornaam:</p>
                </div>
                <div class="input">
                    <input type="text" name="firstname" id="firstname" />
                </div>

                <div class="label">
                    <p>Achternaam:</p>
                </div>
                <div class="input">
                    <input type="text" name="lastname" id="lastname">
                </div>

                <div class="label">
                    <p>Adres:</p>
                </div>
                <div class="input">
                    <input type="text" name="address" id="address">
                </div>
                <div class="label">
                </div>
                <div class="input">
                    <input type="text" name="address2" id="address2">
                </div>

                <div class="label">
                    <p>Postcode:</p>
                </div>
                <div class="input">
                    <input type="text" name="postcode" id="postcode">
                </div>

                <div class="label">
                    <p>Plaats:</p>
                </div>
                <div class="input">
                    <input type="text" name="city" id="city">
                </div>
                <div class="label">
                </div>
                <div class="input">
                    <wr-btn color="primary" dark type="submit">Submit</wr-btn>
                </div>
            </div>
        </div>
        <aside class="sidebar">
            <wr-card>
                <div class="card-content">
                    <h3>Cart</h3>
                    <ul class="items">
                        <li class="item" v-for="item in cart" :key="item.productName">
                            <span>{{ item.productName }}</span>
                            <span>€5</span>
                        </li>
                    </ul>
                </div>
            </wr-card>
        </aside>
    </div>
</template>

<script>
import Card from '@/components/ui-components/Card.vue';
import Button from '@/components/ui-components/Button.vue';

export default {
    components: {
        'wr-card': Card,
        'wr-btn': Button
    },
    data() {
        return {
            guest: false
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
                productName: null
            }]
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
    },
    layout: 'checkout'
}
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    .content {
        width: 75%;
        .credentialGuard {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-column-gap: 2rem;
            .v-card {
            position: relative;
                &__title {
                    margin-bottom: 52px;
                }
                &__actions {
                    margin-top: auto;
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                }
            }
        }
        .form {
            display: grid;
            grid-template-columns: 1fr 3fr;
            grid-gap: 1rem;
            align-items: center;
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
                        padding: 0;
                        font-variant: tabular-nums;
                        list-style: none;
                        -webkit-font-feature-settings: 'tnum';
                        font-feature-settings: 'tnum';
                        position: relative;
                        display: inline-block;
                        width: 100%;
                        height: 32px;
                        padding: 4px 11px;
                        color: rgba(0,0,0,0.65);
                        font-size: 14px;
                        line-height: 1.5;
                        background-color: #fff;
                        background-image: none;
                        border: 1px solid #d9d9d9;
                        border-radius: 4px;
                        -webkit-transition: all .3s;
                        transition: all .3s;
                }
            }
        }
    }
    .sidebar {
        width: 25%;
        margin-left: 2rem;
        .card-content {
            display: block;
            padding: 1rem 2rem;
            .items {
                list-style-type: none;
                margin: 0;
                padding: 0;
                font-size: 1.6rem;
                margin-left: 1rem;
                .item {
                    display: flex;
                    justify-content: space-between;
                }
            }
        }
    }
}
</style>

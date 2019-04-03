<template>
    <div class="container">
        <div class="content">
            <div class="credentialGuard" v-if="this.$store.getters['user/isAuthenticated'] || guest">
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
        </div>
        <aside class="sidebar">
            <v-card>
                <v-card-title>
                    <h3>Cart</h3>
                    <ul class="items">
                        <li class="item" v-for="item in cart" :key="item.productName">
                            <span>{{ item.productName }}</span>
                            <span>€5</span>
                        </li>
                    </ul>
                </v-card-title>
            </v-card>
        </aside>
    </div>
</template>

<script>

export default {
    components: {
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
    }
    .sidebar {
        width: 25%;
        margin-left: 2rem;
        .v-card__title {
            display: block;
            .items {
                list-style-type: none;
                margin: 0;
                padding: 0;
                font-size: 1.4rem;
                .item {
                    display: flex;
                    justify-content: space-between;
                }
            }
        }
    }
}
</style>

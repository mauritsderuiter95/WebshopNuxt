<template>
    <div>
        <h2 class="userNavTitle">Mijn account</h2>
        <transition>
            <ul class="userMenu" v-if="this.$store.getters['user/isAuthenticated']" key="loggedIn">
                <li><nuxt-link to="/account"><wr-btn flat>Mijn overzicht</wr-btn></nuxt-link></li>
                <li><nuxt-link to="/account/bestellingen"><wr-btn flat>Mijn bestellingen</wr-btn></nuxt-link></li>
                <li><nuxt-link to="/account/facturen"><wr-btn flat>Mijn facturen</wr-btn></nuxt-link></li>
                <li><wr-btn flat>Uitloggen</wr-btn></li>
            </ul>
            <ul class="userMenu" v-else key="notLoggedIn">
                <li><nuxt-link to="/account/login"><wr-btn flat>Inloggen</wr-btn></nuxt-link></li>
                <li><nuxt-link to="/account/register"><wr-btn flat>Registreren</wr-btn></nuxt-link></li>
            </ul>
        </transition>
    </div>
</template>

<script>
import Button from '~/components/ui-components/Button.vue';

export default {
    components: {
        'wr-btn': Button
    }
    
}
</script>

<style lang="scss" scoped>
.userNavTitle {
    font-size: 3rem;
}
.userMenu {
    list-style-type: none;
    li {
        color: #000;
        font-size: 2rem;
    }
}
</style>

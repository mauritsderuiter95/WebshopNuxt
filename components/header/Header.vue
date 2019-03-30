<template>
    <div>
        <header>
            <div class="container">
                <div class="row">
                    <div class="left">
                        <nuxt-link to="/"><h1>WR Automaten</h1></nuxt-link>
                        <h2>Uw partner in service!</h2>
                    </div>
                    <div class="right">
                        <div class="search">
                            <Search class="search" />
                            <Cart />
                        </div>
                    </div>
                </div>
                <Navbar />
            </div>
        </header>
    </div>
</template>
<script>
import Cart from '~/components/header/Cart.vue';
import Navbar from '~/components/header/Navbar.vue';
import Search from '~/components/header/Search.vue';

export default {
    components: {
        Cart,
        Navbar,
        Search
    }

}
</script>

<style lang="scss" scoped>
    header {
        width: 100%;
        background: #fff;
        .container {
            display: flex;
            padding: 5rem 0 0;
            flex-wrap: wrap;
            .row {
                width: 100%;
                display: flex;
                justify-content: space-between;
                .left{
                    max-width: 50%;
                    h1 {
                        font-family: Magneto;
                        margin-bottom: 0rem;
                    }
                }
                .right {
                    max-width: 50%;
                    .search {
                        margin-bottom: 0.5rem;
                    }
                }
            }
        }
    }

</style>

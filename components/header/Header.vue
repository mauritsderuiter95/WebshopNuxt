<template>
    <div>
        <header class="top">
            <div class="row">
                <div class="left">
                    <nuxt-link to="/"><h1>WR Automaten &nbsp;</h1></nuxt-link>
                    <h2>-&nbsp;&nbsp;&nbsp;Uw partner in service!</h2>
                </div>
                <div class="right">
                    <div class="menu">
                        <Navbar dark>
                            <Cart />
                        </Navbar>
                    </div>
                </div>
            </div>
        </header>
    </div>
</template>
<script>
import Cart from '~/components/header/Cart.vue';
import Navbar from '~/components/header/Navbar.vue';

export default {
    components: {
        Cart,
        Navbar
    }

}
</script>

<style lang="scss" scoped>
.top {
    clip-path: polygon(0 0, 100% 0, 100% 75%, 0 100%);
    //background: #1a1c33;
    background: $primary-color;
    border-radius: .5rem .5rem 0 0;
    margin-bottom: 10rem;
    display:flex;
    flex-direction: column;
    position: relative;
    padding-bottom: 5rem;
    .row {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 3rem;
        .left{
            max-width: 50%;
            padding-left: 3rem;
            h1 {
                font-family: Magneto;
                margin-bottom: 0rem;
                color: #fff;
                font-size: 4rem;
            }
            h1, h2 {
                display: inline;
                color: #fff;
            }
        }
        .right {
            max-width: 50%;
            padding-right: 3rem;
        }
    }
}
</style>

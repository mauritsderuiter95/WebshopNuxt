<template>
    <div>
        <header>
            <div class="container">
                <div class="left">
                    <h1>WR Automaten</h1>
                    <h2>Uw partner in service!</h2>
                </div>
                <div class="right">
                    <div class="search">
                        <form>
                            <input type="text" name="search" id="search" placeholder="search" />
                            <button class="btn btn-primary">Vind</button>
                        </form>
                        <Cart />
                    </div>
                </div>
            </div>
        </header>
    </div>
</template>
<script>
import Cart from '~/components/Cart.vue';

export default {
    components: {
        Cart,
    }

}
</script>

<style lang="scss" scoped>
    header {
        width: 100%;
        box-shadow: 0 1rem 1rem 0 rgba(0,0,0,0.2);
        border-bottom: 0.2rem solid #7C0000;
        background: #fff;
        .container {
            width: 100%;
            max-width: 120rem;
            display: flex;
            justify-content: space-between;
            margin: 0 auto;
            padding: 5rem 0;
            .left{
                max-width: 50%;
                h1 {
                    font-family: Magneto;
                }
            }
            .right {
                max-width: 50%;
            }
        }
    }

</style>

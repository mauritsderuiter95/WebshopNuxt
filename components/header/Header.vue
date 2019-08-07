<template>
  <div>
    <div class="topContainer">
      <header class="top">
        <div class="row">
          <div class="left">
            <nuxt-link to="/">
              <h1>WR Automaten &nbsp;</h1>
            </nuxt-link>
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
    border-radius: $border-radius $border-radius 0 0;
    display:flex;
    flex-direction: column;
    position: relative;
    padding-bottom: 5rem;
    .row {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
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

@media screen and (max-width: 1600px) {
  .top {
    .row {
      .left {
        width: auto;
        max-width: initial;
        h2 {
          display: none;
        }
      }
      .right {
        width: auto;
        max-width: initial;
      }
    }
  }
}

@media screen and (max-width: 1024px) {
  .top {
    clip-path: none;
    border: none;
    padding-bottom: 1rem;
    border-radius: 0;
    margin-bottom: 6rem;
    .row {
      display: block;
      margin-bottom: 3rem;
      .left {
        width: auto;
        max-width: initial;
        margin-top: 4rem;
        h1 {
          margin-top: 1rem;
        }
        h2 {
          display: none;
        }
      }
      .right {
        width: auto;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .top {
    margin-bottom: 3rem;
    .row {
      .left {
        h1 {
          font-size: 3rem;
        }
      }
    }
  }
}
</style>

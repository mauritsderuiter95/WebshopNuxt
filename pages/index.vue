<template>
  <div>
    <div class="topContainer">
      <header class="top">
        <div class="menu">
          <Navbar dark>
            <nuxt-link to="/cart"><wr-btn flat dark>Winkelwagen</wr-btn></nuxt-link>
          </Navbar>
        </div>
      </header>
      <div class="topContent">
        <div class="box">
          <h1>WR Automaten</h1>
          <sub>Uw Partner in Service</sub>
        </div>
      </div>
    </div>
    <section class="about">
      <div class="intro">
        <h2>About</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam architecto obcaecati tempora quidem rerum. Accusamus, qui corrupti delectus quos sapiente modi cupiditate deleniti? In tempore ut facilis alias mollitia quia.</p>
        <i class="material-icons">
          keyboard_arrow_down
        </i>
      </div>
    </section>
    <section class="coffee">
      <div class="box">
        <div class="flex">
          <div class="img">
            <img src="~/assets/img/Coffee.png" alt="Coffee" title="Coffee" class="boxImg">
          </div>
          <div class="text">
            <h2>Coffee</h2>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil officiis doloremque aspernatur, dignissimos ipsam, nobis ab esse incidunt eius perspiciatis adipisci nostrum hic pariatur dolorum voluptatem sapiente! Architecto, totam itaque.</p>
          </div>
        </div>
      </div>
    </section>
    <section class="vending">
      <div class="box">
        <div class="flex">
          <div class="text">
            <h2>Vending</h2>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil officiis doloremque aspernatur, dignissimos ipsam, nobis ab esse incidunt eius perspiciatis adipisci nostrum hic pariatur dolorum voluptatem sapiente! Architecto, totam itaque.</p>
          </div>
          <div class="img">
            <img src="~/assets/img/vending.png" alt="Vending" title="Vending" class="boxImg">
          </div>
        </div>
      </div>
    </section>
    <section class="occasion">
      <div class="box">
        <div class="flex">
          <div class="img">
            <img src="~/assets/img/soda.png" alt="Occasion" title="Occasion" class="boxImg">
          </div>
          <div class="text">
            <h2>Occasion</h2>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil officiis doloremque aspernatur, dignissimos ipsam, nobis ab esse incidunt eius perspiciatis adipisci nostrum hic pariatur dolorum voluptatem sapiente! Architecto, totam itaque.</p>
          </div>
        </div>
      </div>
    </section>
    <section class="bottom">
      <div class="content">
        <h2>Contact</h2>
        <p></p>
        <a href="https://www.freepik.com/free-photos-vectors/food" target="_new">Illustrations by Macrovector</a>
      </div>
    </section>
  </div>
</template>

<script>
import Navbar from '@/components/header/Navbar';
import Button from '@/components/ui-components/Button.vue';

export default {
  components: {
    Navbar,
    'wr-btn': Button
  },
  layout: 'home'
}
</script>

<style lang="scss" scoped>
.top {
  clip-path: polygon(0 0, 100% 0, 100% 66.67%, 0 100%);
  height: 45vh;
  min-height: 45rem;
  //background: #1a1c33;
  background: $primary-color;
  border-radius: .5rem .5rem 0 0;
  margin-bottom: 24rem;
  display:flex;
  flex-direction: column;
  .menu {
    width: fit-content;
    margin-left: auto;
    margin-top: 3rem;
    margin-right: 3rem;
    font-size: 1.6rem;
  }
}
.topContainer {
  position: relative;
  .topContent {
    position: absolute;
    top: 16rem;
    left: 50%;
    transform: translateX(-50%);
    width: 120rem;
    color: $primary-color;
    .box {
      margin-bottom: 0;
        h1 {
        font-size: 10rem;
        font-family: 'Magneto';
        color: $primary-color;
        margin-bottom: 0.5em;
      }
      sub {
        font-size: 3rem;
      }
    }
  }
}
.intro {
  text-align: center;
  margin: 0 auto 10rem;
  max-width: 70rem;
  color: $primary-color;
  h2 {
    font-size: 7rem;
    margin-bottom: 2rem;
    font-weight: 200;
  }
  p {
    font-size: 2.5rem;
    margin-bottom: 10rem;
  }
  i {
    font-size: 10rem;
  }
}
.box {
  padding: 10rem;
  border-radius: 1rem;
  box-shadow: 0 0 2rem rgba(0,0,0,0.2);
  margin: 0 auto 20rem;
  max-width: 120rem;
  background: #fff;
  .flex {
    display: flex;
    .img {
      width: 50%;
      display: flex;
      justify-content: center;
      .boxImg {
        max-height: 500px;
      }
    }
    .text {
      color: rgba(0,0,0,.8);
      align-self: center;
      width: 50%;
      h2 {
        font-size: 5rem;
        margin-bottom: 2rem;
      }
      p {
        font-size: 2rem;
      }
    }
  }
}
.bottom {
  clip-path: polygon(0 15vh, 100% 0, 100% 100%, 0 100%);
  height: 90vh;
  //background: #1a1c33;
  background: $primary-color;
  border-radius: 0 0 .5rem .5rem;
  padding-top: 15vh;
  .content {
    max-width: 70rem;
    color: #fff;
    margin: 0 auto;
    a {
      color: #fff;
      text-decoration: none;
    }
  }
}

</style>


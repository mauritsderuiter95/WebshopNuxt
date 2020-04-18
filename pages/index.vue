<template>
  <div>
    <div class="box jumbotron">
      <h1>WR Automaten</h1>
      <sub>Uw Partner in Service</sub>
    </div>
    <section class="about">
      <div class="intro">
        <p>
          Koffie, tussendoortjes en frisdrank zonder omkijken? Wij zorgen dat u altijd voorzien
          bent. Catering via automaten heeft de toekomst.
        </p>
      </div>
    </section>
    <section class="coffee">
      <div class="box">
        <div class="flex">
          <div class="img">
            <v-lazy-image src="/img/Coffee.png" alt="Coffee" title="Coffee" class="boxImg" />
          </div>
          <div class="text">
            <h2 class="box-title">WR Koffie</h2>
            <p>
              Onze heerlijke ambachtelijk gebrande bonen komen uit Indonesië en Ethiopië. WR Koffie
              Classic is een milde koffie, zonder de bittere nasmaak en is geschikt voor de
              gemiddelde koffiedrinker. De variant Strong is een streling op de tong voor dé
              koffieliefhebber.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="vending">
      <div class="box">
        <div class="flex">
          <div class="text">
            <h2>Vending</h2>
            <p>
              Kostenloos plaatsen wij frisdrank- en/of zoetwarenautomaten. Wekelijks vullen en
              onderhouden wij dit automaat, zodat u er geen omkijken naar hebt. Wij ontzorgen u
              volledig! Neem voor alle mogelijkheden vrijblijvend contact op met Wim de Ruiter op 06
              - 143 976 20. Voor elke kantine een passend automaat!
            </p>
          </div>
          <div class="img">
            <v-lazy-image src="/img/vending.png" alt="Vending" title="Vending" class="boxImg" />
          </div>
        </div>
      </div>
    </section>
    <section class="occasion">
      <div class="box">
        <div class="flex">
          <div class="img">
            <v-lazy-image src="/img/soda.png" alt="Occasion" title="Occasion" class="boxImg" />
          </div>
          <div class="text">
            <h2>Occasion</h2>
            <p>
              Regelmatig bieden wij ervaren automaten aan. Deze automaten zijn volledig gereviseerd
              en in topconditie. Jarenlang kunt u genieten voor een lage investering in een
              uitstekend automaat. Voor ons actuele aanbod kijkt u op onze occasion-pagina.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  components: {},
  head() {
    return {
      title: 'Home',
    };
  },
};
</script>

<style lang="scss" scoped>
.v-lazy-image {
  opacity: 0;
  transition: opacity 2s;
}
.v-lazy-image-loaded {
  opacity: 1;
}
.intro {
  text-align: center;
  margin: 0 auto 20rem;
  max-width: 70rem;
  color: $primary-color;
  h2 {
    font-size: 7rem;
    margin-bottom: 2rem;
    font-weight: 200;
  }
  p {
    font-size: 2.5rem;
    margin-bottom: 3rem;
  }
  i {
    font-size: 10rem;
  }
}
.jumbotron {
  margin-bottom: 0;
  h1 {
    font-size: 10rem;
    font-family: 'Magneto', Helvetica;
    color: $primary-color;
    margin-bottom: 0.5em;
  }
  sub {
    font-size: 3rem;
  }
}

.box {
  padding: 10rem;
  border-radius: $border-radius;
  box-shadow: $box-shadow;
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
      color: rgba(0, 0, 0, 0.8);
      align-self: center;
      width: 50%;
      h2 {
        font-size: 4.5rem;
        margin-bottom: 2rem;
        font-family: 'Magneto';
        color: #7c0000;
      }
      p {
        font-size: 2rem;
      }
    }
  }
}
@media screen and (max-width: 1024px) {
  .jumbotron {
    h1 {
      font-size: 6rem;
      text-align: center;
    }
    sub {
      text-align: center;
      display: block;
    }
  }
}

@media screen and (max-width: 768px) {
  .jumbotron {
    padding: 5rem;
    margin: 0;
    h1 {
      font-size: 3rem;
    }
    sub {
      font-size: 1.8rem;
    }
  }

  .intro {
    margin: 0 3rem;
    h2 {
      font-size: 4rem;
    }
    p {
      font-size: 2rem;
      margin-bottom: 3rem;
    }
  }

  .box {
    padding: 5rem;
    margin: 3rem;
    .flex {
      .img {
        display: none;
      }
      .text {
        width: auto;
      }
    }
  }
}
</style>

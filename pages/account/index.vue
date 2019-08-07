<template>
  <div class="container">
    <div class="toolbar">
      <h2 class="groupTitle">
        Mijn Account
      </h2>
      <wr-btn
        medium
        color="primary"
        dark
        @click="logOut"
      >
        Uitloggen
      </wr-btn>
    </div>
    <div class="groupHolder">
      <div class="row">
        <h3 class="groupTitle second">
          Gegevens
        </h3>
        <wr-btn medium>
          Wijzigen
        </wr-btn>
      </div>
      <div class="group">
        <div class="row">
          <div class="first summaryLabel">
            Naam
          </div>
          <div class="second">
            {{ user.firstName + " " + user.lastName }}
          </div>
        </div>
        <div class="row">
          <div class="first summaryLabel">
            Adres
          </div>
          <div class="second">
            {{ user.address }}
          </div>
        </div>
        <div class="row">
          <div class="first summaryLabel">
            E-mailadress
          </div>
          <div class="second">
            {{ user.username }}
          </div>
        </div>
        <div class="row">
          <div class="first summaryLabel">
            Wachtwoord
          </div>
          <div class="second">
            **********
          </div>
        </div>
      </div>
    </div>
    <div class="groupHolder">
      <div class="row">
        <h3 class="groupTitle second">
          Bestellingen
        </h3>
        <nuxt-link to="/orders">
          <wr-btn medium>
            Alle Bestellingen
          </wr-btn>
        </nuxt-link>
      </div>
      <div
        v-for="order in orders"
        :key="order.id"
        class="order"
      >
        <nuxt-link :to="`/orders/${order.id}`">
          <div class="row">
            <div class="first">
              <h4 class="groupTitle">
                {{ order.ordernumber }}&nbsp;&nbsp;|
              </h4>
            </div>
            <div class="second">
              <h4>{{ order.created }}</h4>
            </div>
            <h4 class="status">
              {{ order.status }}
            </h4>
          </div>
        </nuxt-link>
        <div
          v-for="product in order.products"
          :key="product.id"
          class="group clickable"
        >
          <nuxt-link :to="`/products/${ product.productId }`">
            <div class="row">
              <div class="image">
                <v-lazy-image
                  :src="product.photo.url"
                  :alt="product.photo.alt"
                  class="boxImg"
                />
              </div>
              <div class="second">
                {{ product.productName }}
              </div>
              <wr-btn flat>
                <i class="material-icons">
                  chevron_right
                </i>
              </wr-btn>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '~/components/ui-components/Button.vue';

export default {
    components: {
        'wr-btn': Button
    },
    data() {
      return {
        user: JSON.parse(JSON.stringify(this.$store.getters['user/currentUser']))
      }
    },
    asyncData({ $axios }) {
      return $axios.$get(`${ $axios.defaults.baseURL }/orders?limit=3`)
        .then(res => {
          return { orders: res }
        })
    },
    methods: {
      logOut() {
        this.$store.dispatch("user/logout");
        window.location = '/account';
      }
    },
    middleware: 'auth'
}
</script>

<style lang="scss" scoped>
.container {
  .toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5rem;
  }
  .groupTitle {
      margin-left: 2rem;
    }
  .groupHolder {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 5rem;
    .group {
      border-radius: $border-radius;
      box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
      width: 100%;
      padding: 1rem 2rem;
      margin: 2.5rem 0;
    }
    .clickable {
      transition: 0.2s;
      &:hover {
        box-shadow: 0 0 2rem rgba(0, 0, 0, 0.2);
      }
    }
    .row {
      display: flex;
      padding-bottom: 1rem;
      padding-top: 1rem;
      align-items: center;
      width: 100%;
      .first {
        color:rgba(0, 0, 0, 0.65);
        margin-right: 1rem;
      }
      .image {
        width: 5rem;
        margin-right: 2rem;
        img {
          width: 100%;
        }
      }
      .second {
        flex-grow: 1;
      }
      .summaryLabel {
        width: 10rem;
      }
      .status {
        margin-right: 1rem;
      }
      button {
        margin-right: 0;
      }
    }
    .order {
      width: 100%;
      &:first-of-type {
        margin-top: 2.5rem;
      }
    }
  }
}
</style>

<template>
  <div>
    <div class="container">
      <div class="toolbar">
        <h2 class="groupTitle">
          Mijn Account
        </h2>
        <wr-btn
          medium
          color="white"
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
          <nuxt-link to="/account/information">
            <wr-btn
              medium
              color="primary"
              dark
            >
              Wijzigen
            </wr-btn>
          </nuxt-link>
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
              {{ user.street }}, {{ user.zipcode }} {{ user.city }}
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
    </div>
    <div class="container">
      <div class="groupHolder">
        <div class="row">
          <h3 class="groupTitle second">
            Laatste 3 bestellingen
          </h3>
          <nuxt-link to="/orders">
            <wr-btn
              medium
              color="primary"
              dark
            >
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
                  Ordernummer {{ order.ordernumber }}&nbsp;&nbsp;|
                </h4>
              </div>
              <div class="second">
                <h4>{{ formatDate(order.created) }}</h4>
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
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import cloneDeep from 'lodash/cloneDeep';
import { createComponent } from '@vue/composition-api';
import moment from 'moment';
import Button from '../../components/ui-components/Button.vue';
import Order from '../../models/Order';
import Response from '../../models/Response';

export default createComponent({
  components: {
    'wr-btn': Button,
  },
  asyncData(ctx : any) {
    return ctx.$axios.$get(`${ctx.$axios.defaults.baseURL}/orders?take=3`)
      .then((res : Response<Order>) => ({ orders: res.data }));
  },
  middleware: 'auth',

  setup(props, ctx) {
    const user = cloneDeep(ctx.root.$store.getters['user/currentUser']);

    function logOut() {
      ctx.root.$store.dispatch('user/logout');
      ctx.root.$router.push('/account/login');
    }

    function formatDate(date : string) {
      return moment(date).format('DD MMMM YYYY hh:mm');
    }

    return {
      props,
      user,
      logOut,
      formatDate,
    };
  },

});
</script>

<style lang="scss" scoped>
.container {
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
    padding: 4rem;
    background: #fff;
    border-radius: 0.25rem;
    margin-bottom: 2rem;
  .toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5rem;
  }
  .groupTitle {
      margin-left: 2rem;
      color: #7C0000;
    }
  .groupHolder {
    display: flex;
    flex-wrap: wrap;
    .group {
      width: 100%;
      padding: 1rem 2rem;
      margin: 2.5rem 0;
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
        color: #000;
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

@media screen AND (max-width: 475px) {
  .container {
    padding: 2rem;
    .groupTitle {
      font-size: 2rem;
      margin: 0;
    }
    .groupHolder {
      .row {
        flex-wrap: wrap;
        .first {
          width: 100%;
        }
        a, button {
          width: 100%;
        }
        a {
          margin-top: 2rem;
        }
      }
    }
  }
}
</style>

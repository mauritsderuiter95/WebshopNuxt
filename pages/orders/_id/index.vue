<template>
  <div>
    <div v-if="orderExists()">
      <div class="status">
        <div
          v-if="state.order.status === 'Wachten op betaling'"
          class="warning"
        >
          <span>Uw betaling is nog niet verwerkt</span>
          <div class="lds-ripple">
            <div /><div />
          </div>
        </div>
        <div
          v-if="state.order.status === 'Betaling is mislukt'"
          class="error"
        >
          <span>Uw betaling is mislukt</span>
        </div>
        <div
          v-if="state.order.status === 'Betaald'"
          class="success"
        >
          <span>Betaling verwerkt</span>
        </div>
      </div>
      <div class="container">
        <div class="groupHolder">
          <div class="row">
            <h2 class="groupTitle second">
              Bestelling {{ state.order.ordernumber }}
            </h2>
            <wr-btn
              v-if="false"
              medium
              color="primary"
              dark
            >
              Factuur
            </wr-btn>
          </div>
          <div class="row">
            <div>
              <span>
                <b>Besteldatum:</b>&nbsp;&nbsp;{{ state.date }}
              </span>
            </div>
          </div>
          <div class="row">
            <div>
              <span>
                <b>Betaalmethode:</b>&nbsp;&nbsp;
                {{ state.order.ideal ? "iDeal" : "Banktransfer" }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div
          class="groupHolder"
        >
          <div class="row">
            <h3 class="groupTitle second">
              Producten
            </h3>
          </div>
          <div
            class="order"
          >
            <div
              v-for="product in state.order.products"
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
                    <span v-if="product.count > 1">{{ product.count }} x</span>&nbsp;
                    €{{ Number(product.productPrice).toFixed(2) }}
                  </wr-btn>
                </div>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="groupHolder">
          <div class="row">
            <h3 class="groupTitle second">
              Totaal
            </h3>
            <table>
              <tr>
                <td>Subtotaal</td>
                <td>€{{ Number(state.total).toFixed(2) }}</td>
              </tr>
              <tr>
                <td>Verzendkosten</td>
                <td>€{{ Number(state.order.sendingCosts).toFixed(2) }}</td>
              </tr>
              <br>
              <tr>
                <td><b>Totaal</b></td>
                <td>
                  <b>€{{ (Number(state.total) + Number(state.order.sendingCosts)).toFixed(2) }}</b>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="groupHolder">
          <div class="row">
            <h3 class="groupTitle second">
              Levering
            </h3>
            <table>
              <tr>
                <td><b>Afleveradres:</b></td>
              </tr>
              <tr v-if="state.order.user.company">
                <td>{{ state.order.user.company }}</td>
              </tr>
              <tr>
                <td>{{ state.order.user.firstName }} {{ state.order.user.lastName }}</td>
              </tr>
              <tr>
                <td>{{ state.order.user.street }}</td>
              </tr>
              <tr v-if="state.order.user.street2">
                <td>{{ state.order.user.street2 }}</td>
              </tr>
              <tr>
                <td>{{ state.order.user.zipcode }} {{ state.order.user.city }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="container">
      <div
        class="bigger"
      >
        <div class="row">
          <h2 class="groupTitle second">
            Geen toegang
          </h2>
        </div>
        <div class="row">
          <p>
            Om toegang te krijgen kunt u gebruik maken van de link in de gekregen e-mail,
            of inloggen via de knop "Account" bovenin het scherm.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  createComponent, reactive, onMounted, computed,
} from '@vue/composition-api';
import moment from 'moment';
import Button from '../../../components/ui-components/Button.vue';
import Order from '../../../models/Order';
import CartProduct from '../../../models/CartProduct';

export default createComponent({
  components: {
    'wr-btn': Button,
  },
  setup(props, ctx) {
    const order = new Order();

    const invoiceUrl = '';

    const state : any = reactive({
      order,
      invoiceUrl,
      date: computed(() => moment(state.order.created).format('DD MMMM YYYY hh:mm')),
      total: computed(() => {
        let total : number = 0;
        state.order.products.forEach((product : CartProduct) => {
          total += product.productPrice * product.count;
        });
        return total;
      }),
    });

    // eslint-disable-next-line consistent-return
    const getData = async () => {
      let url = `${(ctx.root as any).$axios.defaults.baseURL}/orders/${ctx.root.$route.params.id}`;
      let newOrder = new Order();
      if (!ctx.root.$store.getters['user/currentUser'] && !ctx.root.$route.query.key) {
        return newOrder;
      }
      if (ctx.root.$route.query.key) { url = `${url}?key=${ctx.root.$route.query.key}`; }
      await (ctx.root as any).$axios.$get(url)
        .then((res : Order) => {
          newOrder = res;
        });
      state.order = newOrder;
      state.invoiceUrl = `http://backend.wrautomaten.nl/api/orders/${state.order.id}/invoice?key=${state.order.key}`;
    };

    const checkStatus = async () => {
      const dataInterval = setInterval(async () => {
        if (!state.order.ideal) {
          await getData();
        }
        if (state.order.status === 'Gelukt' || state.order.status === 'Betaling is mislukt' || !state.order.ideal) { clearInterval(dataInterval); }
        if (ctx.root.$route.params.id === undefined) { clearInterval(dataInterval); }
      }, 5000);
    };

    const orderExists = () => {
      if (state.order.id.length > 1) {
        return true;
      }
      return false;
    };

    onMounted(async () => {
      await getData();
      checkStatus();
    });

    return {
      props,
      state,
      orderExists,
    };
  },
});
</script>

<style lang="scss" scoped>
.status {
  border-radius: $border-radius;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
  width: 100%;
  margin: 0 auto 2rem;
  max-width: 120rem;
  &>div {
    display: flex;
    align-items: center;
    border-radius: inherit;
    padding: 2rem;
    justify-content: space-between;
  }
  .warning {
    background: #ffc107;
  }
  .error {
    background: #dc3545;
    &>span {
      color: #fff;
    }
  }
  .success {
    background: #28a745;
    &>span {
      color: #fff;
    }
  }
}
.container {
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
  padding: 4rem;
  background: #fff;
  border-radius: 0.25rem;
  margin-bottom: 2rem;
  .groupHolder {
    display: flex;
    flex-wrap: wrap;
    .group {
      border-radius: $border-radius;
      width: 100%;
      padding: 1rem 0;
    }
    // .clickable {
    //   transition: 0.2s;
    //   &:hover {
    //     box-shadow: 0 0 2rem rgba(0, 0, 0, 0.2);
    //   }
    // }
    .row {
      display: flex;
      padding-bottom: 1rem;
      padding-top: 1rem;
      width: 100%;
      flex-wrap: wrap;
      .first {
        color: rgba(0,0,0,0.65);
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
      button {
        margin-left: auto;
      }
      table {
        width: 30rem;
        tr {
          td {
            &:nth-of-type(2) {
              text-align: right;
            }
          }
        }
      }
    }
    .order {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr;
      row-gap: 1rem;
      .overview {
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 3rem;
      }
      .row {
        align-items: center;
      }
    }
    .toolbar {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      .v-btn {
        margin: 0;
      }
    }
  }
  .bigger {
    margin: 5rem;
    p {
      margin-top: 3rem;
    }
  }
}

@media screen AND (max-width: 475px){
  .container {
    padding: 2rem;
  }
}

.lds-ripple {
  display: inline-block;
  position: relative;
  width: 4rem;
  height: 4rem;
}
.lds-ripple div {
  position: absolute;
  border: 4px solid #fff;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% {
    top: 1.9rem;
    left: 1.9rem;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: -1px;
    left: -1px;
    width: 4rem;
    height: 4rem;
    opacity: 0;
  }
}
</style>

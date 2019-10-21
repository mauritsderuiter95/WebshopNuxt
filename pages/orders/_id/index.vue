<template>
  <div class="container">
    <div
      v-if="orderExists()"
      class="groupHolder"
    >
      <div class="row">
        <h2 class="groupTitle second">
          Bestelling {{ state.order.ordernumber }}
        </h2>
        <h4 class="groupTitle">
          {{ state.order.created }}
        </h4>
      </div>
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
                <i class="material-icons">
                  chevron_right
                </i>
              </wr-btn>
            </div>
          </nuxt-link>
        </div>
      </div>
      <div class="toolbar">
        <a
          :href="state.invoiceUrl"
          download="factuur.pdf"
        >
          <wr-btn
            medium
            color="primary"
            dark
          >Factuur</wr-btn>
        </a>
      </div>
    </div>
    <div
      v-else
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
</template>

<script lang="ts">
import {
  createComponent, reactive, onMounted,
} from '@vue/composition-api';
import Button from '../../../components/ui-components/Button.vue';
import Order from '../../../models/Order';

export default createComponent({
  components: {
    'wr-btn': Button,
  },
  setup(props, ctx) {
    const order = new Order();

    const invoiceUrl = `http://backend.wrautomaten.nl/api/orders/${order.id}/invoice?key=${order.key}`;

    const state = reactive({
      order,
      invoiceUrl,
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
    };

    const checkStatus = async () => {
      const dataInterval = setInterval(async () => {
        await getData();
        if (state.order.status === 'Gelukt' || state.order.status === 'Betaling is mislukt') { clearInterval(dataInterval); }
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
      if (!ctx.root.$route.query.banktransfer) {
        checkStatus();
      }
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
.container {
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
  padding: 4rem;
  background: #fff;
  border-radius: 0.25rem;
  .toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5rem;
  }
  .groupHolder {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 5rem;
    .status {
      border-radius: $border-radius;
      box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
      width: 100%;
      margin: 2rem 0;
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
    .group {
      border-radius: $border-radius;
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
        margin-right: 0;
      }
    }
    .order {
      width: 100%;
      &:first-of-type {
        margin-top: 2.5rem;
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

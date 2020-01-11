<template>
  <div class="container">
    <div class="groupHolder">
      <div class="row">
        <h2 class="groupTitle second">
          Bestellingen
        </h2>
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

<script lang="ts">
import {
  createComponent,
} from '@vue/composition-api';
import moment from 'moment';
import Button from '../../components/ui-components/Button.vue';
import Order from '../../models/Order';
import Response from '../../models/Response';

export default createComponent({
  components: {
    'wr-btn': Button,
  },
  asyncData({ $axios } : any) {
    return $axios.$get(`${$axios.defaults.baseURL}/orders`)
      .then((res : Response<Order>) => ({ orders: res.data }));
  },
  setup() {
    const formatDate = (date : any) => moment(date).format('DD MMMM YYYY hh:mm');

    return {
      formatDate,
    };
  },
  middleware: 'auth',
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
  .groupTitle {
      margin-left: 2rem;
      color: #7C0000
    }
  .groupHolder {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 5rem;
    .group {
      width: 100%;
      padding: 1rem 2rem;
      margin: 2.5rem 0;
    }
    .clickable {
      transition: 0.2s;
      &:hover {
        box-shadow: 0 0 2rem rgba(0, 0, 0, 0.1);
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
      .status {
        margin-right: 2rem;
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

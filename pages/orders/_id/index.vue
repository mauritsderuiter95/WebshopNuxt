<template>
  <div class="container">
    <div class="groupHolder">
      <div class="row">
        <h2 class="groupTitle second">
          Bestelling {{ order.ordernumber }}
        </h2>
      </div>
      <div
        class="order"
      >
        <nuxt-link :to="`/orders/${order.id}`">
          <div class="row">
            <div class="second">
              <h4 class="groupTitle">
                {{ order.created }}
              </h4>
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
              <div class="first">
                {{ product.photo }}
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
    asyncData({ $axios, params }) {
      return $axios.$get(`${ $axios.defaults.baseURL }/orders/${params.id}`)
        .then(res => {
          return { order: res }
        })
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
      border-radius: 4px;
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
        color: rgba(0,0,0,0.65);
        margin-right: 1rem;
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

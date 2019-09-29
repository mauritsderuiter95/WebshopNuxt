<template>
  <div class="container">
    <div
      v-if="order"
      class="groupHolder"
    >
      <div class="row">
        <h2 class="groupTitle second">
          Bestelling {{ order.ordernumber }}
        </h2>
        <h4 class="groupTitle">
          {{ order.created }}
        </h4>
      </div>
      <div class="status">
        <div
          v-if="order.status === 'Wachten op betaling'"
          class="warning"
        >
          <span>Uw betaling is nog niet verwerkt</span>
          <div class="lds-ripple">
            <div /><div />
          </div>
        </div>
        <div
          v-if="order.status === 'Betaling is mislukt'"
          class="error"
        >
          <span>Uw betaling is mislukt</span>
        </div>
        <div
          v-if="order.status === 'Betaald'"
          class="success"
        >
          <span>Betaling verwerkt</span>
        </div>
      </div>
      <div
        class="order"
      >
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
      <div class="toolbar">
        <a
          :href="invoiceUrl"
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
        <p>Om toegang te krijgen kunt u gebruik maken van de link in de gekregen e-mail, of inloggen via de knop "Account" bovenin het scherm.</p>
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
  computed: {
    invoiceUrl() {
      return `http://backend.wrautomaten.nl/api/orders/${this.order.id}/invoice?key=${this.order.key}`;
    }
  },
  asyncData({ $axios, params, query }) {
    let url = `${ $axios.defaults.baseURL }/orders/${params.id}`;
    if (query.key)
      url = `${url}?key=${query.key}`;
    return $axios.$get(url)
      .then(res => {
        return { order: res }
      })
      .catch(e => {
        console.log(e)
      })
  },
  mounted() {
    this.checkStatus();
  },
  methods: {
    getData() {
      let url = `${ this.$axios.defaults.baseURL }/orders/${this.$route.params.id}`;
      if (this.$route.query.key)
        url = `${url}?key=${this.$route.query.key}`;
      this.$axios.$get(url)
      .then(res => {
        this.order = res;
      })
    },
    checkStatus() {
      let dataInterval = setInterval(() => {
        this.getData();
        if(this.order.status === "Gelukt" || this.order.status === "Betaling is mislukt")
          clearInterval(dataInterval);
        if(this.$route.params.id === undefined)
          clearInterval(dataInterval);
      }, 5000);
    }
  }
}
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

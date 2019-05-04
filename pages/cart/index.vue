<template>
  <div class="container">
    <a-table
      :columns="columns"
      :row-key="record => record.productId"
      :data-source="setData"
      :loading="loading"
      :pagination="false"
      class="table"
    >
      <!-- <a-input-number :min="1" :max="10" slot="count" /> -->
      <template
        v-for="col in ['count']"
        :slot="col"
        slot-scope="count, record"
      >
        <div :key="col">
          <a-input-number
            style="margin: -5px 0"
            :value="count"
            :min="1"
            :max="20"
            @change="e => editCart(e, record.productId)"
          />
        </div>
      </template>
    </a-table>
    <div class="toolbar">
      <div class="checkout">
        <nuxt-link to="cart/checkout">
          <wr-btn
            color="primary"
            dark
          >
            Checkout
          </wr-btn>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { Table, InputNumber } from 'ant-design-vue';
import ProductService from '~/services/product.service.js';
import btn from '@/components/ui-components/Button.vue';

const columns = [{
//   title: 'Thumbnail',
//   dataIndex: 'photos[0]',
//   width: '20%',
//   scopedSlots: { customRender: 'thumbnail' },
// }, {
  title: 'Productname',
  dataIndex: 'productName',
  width: '20%',
}, {
  title: 'Count',
  dataIndex: 'count',
  scopedSlots: { customRender: 'count' },
}];

export default {
    components: {
        'a-table': Table,
        'a-input-number': InputNumber,
        'wr-btn': btn
    },
    data() {
        return {
            pagination: {},
            loading: false,
            columns
        }
    },
    computed: {
        setData() {
            if(this.$store.getters['cart/currentCart']) {
                return this.$store.getters['cart/currentCart'].products;
            }
            return [{
                count: 0,
                productId: 0,
                id: 0,
                productName: null
            }]
        }
    },
    methods: {
        editCart(value, productId) {
            if(value >= 1) {
                let cart = {};
                cart.id = this.$store.getters['cart/currentCart'].id;
                cart.products = []
                for(let key in this.$store.getters['cart/currentCart'].products) {
                    let cartProduct = {};
                    cartProduct.productId = this.$store.getters['cart/currentCart'].products[key].productId;
                    cartProduct.productId === productId ? cartProduct.count = value : cartProduct.count = this.$store.getters['cart/currentCart'].products[key].count;
                    cart.products.push(cartProduct);
                }
                this.$store.dispatch("cart/editCart", cart);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.table {
    background: #fff;
    margin-bottom: 2rem;
    box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12);
}
.toolbar {
    display: flex;
    justify-content: flex-end;
    .v-btn {
        margin: 0;
    }
}

</style>



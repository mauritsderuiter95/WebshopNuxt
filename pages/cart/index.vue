<template>
    <div class="container">
        <a-table :columns="columns"
            :rowKey="record => record.productId"
            :dataSource="setData"
            :loading="loading"
            :pagination="false"
            class="table"
        >
        <!-- <a-input-number :min="1" :max="10" slot="count" /> -->
        <template v-for="col in ['count']" :slot="col" slot-scope="count, record">
            <div :key="col">
                <a-input-number
                    style="margin: -5px 0"
                    :value="count"
                    @change="e => editCart(e, record.productId)"
                    :min="1"
                    :max="20"
                />
            </div>
        </template>
        </a-table>
        <div class="toolbar">
            <div class="checkout">
                <nuxt-link to="cart/checkout"><a-button type="primary">Checkout</a-button></nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
import { Table, InputNumber, Button } from 'ant-design-vue';
import ProductService from '~/services/product.service.js';

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
        'a-button': Button
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
}
.toolbar {
    display: flex;
    justify-content: flex-end;
}

</style>



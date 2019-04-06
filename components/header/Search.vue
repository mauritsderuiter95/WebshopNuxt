<template>
  <div class="search">
    <input type="text" name="searchBar" id="searchBar" @change="searchProduct($event.target.value)">
    <div class="results">
      <ul>
        <li v-for="item in items" :key="item.ProductName">{{ item.ProductName}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import ProductService from '~/services/product.service.js';

export default {
    data() {
        return {
            products: [],
            entries: [],
            isLoading: false,
            model: null,
            search: null
        }
    },
    computed: {
      fields () {
        if (!this.model) return []

        return Object.keys(this.model).map(key => {
          return {
            key,
            value: this.model[key] || 'n/a'
          }
        })
      },
      items () {
        if (this.entries) {
          return this.entries.map(entry => {
            const ProductName = entry.productName
            console.log(ProductName);
            return Object.assign({}, entry, { ProductName });
          })
        }
        return null;
      }
    },
    methods: {
      searchProduct(val) {
        // Items have already been loaded
        if (this.items.length > 0) return;

        // Items have already been requested
        if (this.isLoading) return;

        this.isLoading = true;

        // Lazily load input items
        ProductService.getProducts()
        .then(res => {
          this.count = res.data.length;
          this.entries = res.data;
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => (this.isLoading = false));
      }
    }
}
</script>

<style lang="scss" scoped>
.search {
  position: relative;
  input {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-variant: tabular-nums;
    list-style: none;
    -webkit-font-feature-settings: 'tnum';
    font-feature-settings: 'tnum';
    position: relative;
    display: inline-block;
    width: 100%;
    height: 32px;
    padding: 4px 11px;
    color: rgba(0,0,0,0.65);
    font-size: 14px;
    line-height: 1.5;
    background-color: #fff;
    background-image: none;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    -webkit-transition: all .3s;
    transition: all .3s;
  }
  .results {
    position: absoluut;
    top: 4rem;
    background: #fff;
    border-radius: 2px;
  }
}
</style>

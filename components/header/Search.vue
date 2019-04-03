<template>
      <v-autocomplete
        v-model="model"
        :items="items"
        :loading="isLoading"
        :search-input.sync="search"
        color="primary"
        hide-no-data
        hide-selected
        item-text="ProductName"
        label="Zoek een product"
        return-object
      ></v-autocomplete>
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

    watch: {
      search (val) {
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
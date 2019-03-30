<template>
  <div class="certain-category-search-wrapper" style="width: 250px">
    <a-auto-complete
      class="certain-category-search"
      dropdownClassName="certain-category-search-dropdown"
      :dropdownMatchSelectWidth="false"
      :dropdownStyle="{width: '300px'}"
      size="large"
      style="width: 100%"
      placeholder="input here"
      optionLabelProp="value"
    >
      <template slot="dataSource">
        <a-select-option v-for="product in products" :key="product.id" :value="product.productName">
            <nuxt-link :to="'/products/' + product.id" class="searchResult">{{ product.productName }}</nuxt-link>
        </a-select-option>
        <a-select-option disabled key="all" class="show-all">
          <a
            href="https://www.google.com/search?q=antd"
            target="_blank"
            rel="noopener noreferrer"
          >
            Bekijk alle resultaten
          </a>
        </a-select-option>
      </template>
      <a-input @change="filterProducts($event)">
        <a-icon slot="suffix" type="search" class="certain-category-icon" />
      </a-input>
    </a-auto-complete>
  </div>
</template>

<script>
import { AutoComplete, Select, Input, Icon } from 'ant-design-vue';
import ProductService from '~/services/product.service.js';

export default {
    components: {
        'a-auto-complete': AutoComplete,
        'a-select-option': Select.Option,
        'a-input': Input,
        'a-icon': Icon
    },
    data() {
        return {
            products: []
        }
    },
    methods: {
        filterProducts(event) {
            if(event.target.value.length > 0) {
                console.log(event.target.value);
                ProductService.getProducts()
                .then((response) => {
                    let dataSource = response.data.filter((x) => x.productName.toLowerCase().includes(event.target.value.toLowerCase()));
                    if (dataSource.length > 10) {
                        dataSource = dataSource.slice(0, 9);
                    }
                    this.products = dataSource;
                })
            }
            else {
                this.products = [];
            }
        }
    }
}
</script>
<style>
.searchResult {
    display: block;
    width: 100%;
    height: 100%;
}

.certain-category-search-dropdown .ant-select-dropdown-menu-item-group-title {
  color: #666;
  font-weight: bold;
}

.certain-category-search-dropdown .ant-select-dropdown-menu-item-group {
  border-bottom: 1px solid #F6F6F6;
}

.certain-category-search-dropdown .ant-select-dropdown-menu-item {
  padding-left: 16px;
}

.certain-category-search-dropdown .ant-select-dropdown-menu-item.show-all {
  text-align: center;
  cursor: default;
}

.certain-category-search-dropdown .ant-select-dropdown-menu {
  max-height: 300px;
}
</style>
<style scoped>
  .certain-category-search-wrapper >>> .certain-category-search.ant-select-auto-complete .ant-input-affix-wrapper .ant-input-suffix {
    right: 12px;
  }
  .certain-category-search-wrapper >>> .certain-search-item-count {
    position: absolute;
    color: #999;
    right: 16px;
  }
  .certain-category-search-wrapper >>> .certain-category-search.ant-select-focused .certain-category-icon {
    color: #108ee9;
  }
  .certain-category-search-wrapper >>> .certain-category-icon {
    color: #6E6E6E;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    font-size: 16px;
  }
</style>
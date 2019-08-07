<template>
  <div
    class="bar"
    @click="expandBar"
  >
    <h2 class="categoryTitle">
      Categorieën
    </h2>
    <i
      ref="icon"
      class="material-icons"
    >
      expand_more
    </i>
    <ul
      ref="categoryList"
      class="categoryList"
    >
      <li class="categoryListItem">
        <nuxt-link to="/products">
          <wr-btn flat>
            Alle
          </wr-btn>
        </nuxt-link>
      </li>
      <li
        v-for="category in categoryList"
        :key="category"
        class="categoryListItem"
      >
        <nuxt-link :to="'/products?category=' + category">
          <wr-btn flat>
            {{ category }}
          </wr-btn>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import Button from '~/components/ui-components/Button.vue';
import ProductService from '~/services/product.service.js';

export default {
    components: {
        'wr-btn': Button
    },
    data() {
        return {
          categoryList: Array,
          expanded: false
        }
    },
    mounted() {
        ProductService.getCategories()
        .then((res) => {
            this.categoryList = res.data;
        });
    },
    methods: {
      expandBar() {
        this.expanded = !this.expanded;
        if(this.expanded) {
          this.$refs.categoryList.classList.add('openList');
          this.$refs.icon.classList.add('rotate');
        }
        else {
          this.$refs.categoryList.classList.remove('openList');
          this.$refs.icon.classList.remove('rotate');
        }
      }
    }
}
</script>

<style lang="scss" scoped>
.bar {
  display: flex;
  align-items: center;
  height: 100%;
  i {
    display: none;
  }
  .categoryTitle {
    margin: 0;
    padding: 2rem;
  }
  .categoryList {
    list-style-type: none;
    margin: 0 0 0 2rem;
    display: flex;
    border-left: 1px solid rgba(0,0,0,0.2);
    align-items: center;
    .categoryListItem {
      color: #000;
      font-size: 2rem;
      cursor: pointer;
    }
  }
}

@media screen and (max-width: 1024px) {
  .bar {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    .categoryTitle {
      height: 100%;
      line-height: 1.49;
    }
    i {
      display: initial;
      font-size: 5rem;
      position: absolute;
      right: 2rem;
      top: calc(50% - 25px);
      transition: transform .2s;
    }
    .rotate {
      transform: rotateX(180deg);
    }
    .categoryList {
      display: grid;
      transform: translateY(-2rem);
      transition: transform .2s;
      grid-template-columns: 1fr;
      column-gap: 3rem;
      position: absolute;
      top: 70px;
      left: 0;
      width: calc(100% - 6rem);
      margin: 0 3rem;
      border: none;
      border-radius: $border-radius;
      background: #fff;
      padding-top: 14px;
      box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
      opacity: 0;
      z-index: -1;
    }
    .openList {
      transform: translateY(0);
      opacity: 1;
      z-index: 10;
    }
  }
}
@media screen and (max-width: 768px) {
  .bar {
    justify-content: flex-start;
  }
}
</style>

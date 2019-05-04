<template>
  <div
    v-click-outside="moveDefault"
    class="search"
  >
    <div
      ref="placeholder"
      class="placeholder"
      @click="moveLeft"
    >
      <span><i class="material-icons">search</i><span
        ref="text"
        class="text"
      >&nbsp;Zoeken</span></span>
    </div>
    <input
      id="searchBar"
      ref="input"
      type="text"
      name="searchBar"
      @change="searchProduct($event.target.value)"
    >
  </div>
</template>

<script>
import ProductService from '~/services/product.service.js';
import ClickOutside from 'vue-click-outside';

export default {
  directives: {
    ClickOutside
  },
  data() {
      return {
          products: [],
          entries: [],
          isLoading: false,
          model: null,
          search: null,
          items: null
      }
  },
  methods: {
    moveLeft() {
      this.$refs.placeholder.style.width = "11rem";
      this.$refs.text.style.opacity = "0";
      let input = this.$refs.input;
      setTimeout(
        function(){
          input.focus();
        }, 200
      )
    },
    moveDefault() {
      this.$refs.placeholder.style.width = "100%";
      this.$refs.text.style.opacity = "100";
    }
  }

}
</script>

<style lang="scss" scoped>
.search {
  position: relative;
  width: 100%;
  .placeholder {
    position: relative;
    z-index: 2;
    text-align: center;
    width: 100%;
    padding: 2.9rem;
    transition: all 0.2s;
    cursor: text;
    span {
      display: flex;
      align-content: center;
      justify-content: center;
      i {
        font-size: 2.6rem;
      }
      .text {
        font-size: 1.8rem;
        transition: all 0.2s;
      }
    }
  }
  input {
    position: absolute;
    display: block;
    width: 100%;
    padding: 2.9rem 2rem 2.9rem 4.5rem;
    color: rgba(0, 0, 0, 0.65);
    font-size: 1.8rem;
    line-height: 1.5;
    background-color: #fff;
    background-image: none;
    border: none;
    border-radius: 4px;
    transition: all .3s;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
    z-index: 1;
    top: 0;
  }
  .results {
    position: absoluut;
    background: #fff;
    border-radius: 2px;
  }
}
</style>

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
      v-model="state.searchValue"
      type="text"
      name="searchBar"
      @input="searchProduct"
    >
  </div>
</template>

<script lang="ts">
import { createComponent, watch } from '@vue/composition-api';
import ClickOutside from 'vue-click-outside';

export default createComponent({
  directives: {
    ClickOutside,
  },
  setup(props, ctx) {
    const state = {
      searchValue: '',
    };

    const moveLeft = () => {
      if (!ctx.refs.placeholder && !ctx.refs.text && !ctx.refs.input) {
        return;
      }

      ctx.refs.placeholder.style.width = '11rem';
      ctx.refs.text.style.opacity = '0';

      setTimeout(
        () => {
          ctx.refs.input.focus();
        }, 200,
      );
    };

    const moveDefault = () => {
      if (state.searchValue.length === 0) {
        ctx.refs.placeholder.style.width = '100%';
        ctx.refs.text.style.opacity = '100';
      }
    };

    const searchProduct = () => {
      ctx.root.$router.push({ query: { search: state.searchValue } });
    };

    watch(() => {
      const searchString = ctx.root.$route.query.search;
      if (searchString) {
        moveLeft();
        state.searchValue = ctx.root.$route.query.search;
        if (ctx.refs.input) {
          ctx.refs.input.value = ctx.root.$route.query.search;
        }
      }
    });

    return {
      props,
      state,
      moveDefault,
      moveLeft,
      searchProduct,
    };
  },

});
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
    border-radius: $border-radius;
    transition: all .3s;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
    z-index: 1;
    top: 0;
  }
  .results {
    position: absoluut;
    background: #fff;
    border-radius: $border-radius;
  }
}

@media screen and (max-width: 1024px) {

}
</style>

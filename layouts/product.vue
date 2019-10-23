<template>
  <div id="product" role="main">
    <transition
      name="productLayout"
      mode="out-in"
    >
      <nuxt />
    </transition>
  </div>
</template>

<script>

export default {
  components: {
  },
};
</script>


<style lang="scss" scoped>
</style>

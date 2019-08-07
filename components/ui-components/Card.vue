<template>
  <div class="card">
    <slot />
  </div>
</template>

<script>
export default {
    props: {
        // eslint-disable-next-line
        image: Object,
    }

}
</script>

<style lang="scss" scoped>
.card {
    background: #fff;
    border-radius: $border-radius;
    transition: 0.3s;
    box-shadow: $box-shadow;
    height: 100%;
    position: relative;
    overflow: hidden;
}
</style>

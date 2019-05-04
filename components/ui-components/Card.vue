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
    border-radius: 4px;
    transition: 0.3s;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
    height: 100%;
    position: relative;
    overflow: hidden;
}
</style>

<template>
  <div>
    <div class="notice">
      Deze shop is nog in aanbouw. Bestellingen worden geannuleerd.
    </div>
    <div class="spacer" />
    <nuxt />
  </div>
</template>

<script>
export default {
  components: {
  },
}
</script>


<style lang="scss" scoped>
.notice {
  position: fixed;
  top: 0;
  z-index: 10;
  text-align: center;
  padding: 2rem;
  width: 100%;
  left: 0;
  color: #fff;
  background: #ffc107;
}
.spacer {
  height: 2rem;
}
</style>

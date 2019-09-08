<template>
  <div>
    <Box title="Validatie" />
    <p ref="message" />
  </div>
</template>

<script>
import Box from '@/components/ui-components/Box.vue';

export default {
  components: {
    Box
  },
  data() {
    return {
    }
  },
  mounted() {
    this.$axios.$get(`${ this.$axios.defaults.baseURL }/verifications/${ this.$route.params.id }`)
      .then((res) => {
        this.$refs.message.textContent = "Uw e-mailadres is succesvol gevalideerd. U kunt nu inloggen en bestellingen doen.";
      })
      .catch((e) => {
        this.$refs.message.textContent = "Er ging iets mis. Neem contact op met de softwareleverancier.";
      })
  },
}
</script>

<style lang="scss" scoped>
</style>

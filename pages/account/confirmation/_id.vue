<template>
  <div>
    <Box title="Validatie">
      <p>{{ message }}</p>
    </Box>
  </div>
</template>

<script lang="ts">
import { createComponent, ref, onMounted } from '@vue/composition-api';
import Box from '../../../components/ui-components/Box.vue';

export default createComponent({
  components: {
    Box,
  },

  setup(props, ctx) {
    const message = ref('');

    onMounted(() => {
      (ctx.root as any).$axios.$get(`${(ctx.root as any).$axios.defaults.baseURL}/verifications/${ctx.root.$route.params.id}`)
        .then(() => {
          message.value = 'Uw e-mailadres is succesvol gevalideerd. U kunt nu inloggen en bestellingen doen.';
        })
        .catch(() => {
          message.value = 'Er ging iets mis. Neem contact op met de softwareleverancier.';
        });
    });

    return {
      message,
      ctx,
      props,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>

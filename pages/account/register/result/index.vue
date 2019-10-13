<template>
  <div>
    <Box title="Registratie succesvol">
      Er is een e-mail verstuurd naar het opgegeven e-mailadres.
      Deze dient eerst geverifieerd te worden, voordat er besteld kan worden.
    </Box>
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api';
import Box from '../../../../components/ui-components/Box.vue';

export default createComponent({
  components: {
    Box,
  },
});
</script>

<style lang="scss" scoped>
</style>

<template>
  <div class="body">
    <Box
      title="WR Koffie"
      content="Onze heerlijke ambachtelijk gebrande bonen komen uit Indonesië en Ethiopië.
      WR Koffie Classic is een milde koffie, zonder de bittere nasmaak en is geschikt voor
      de gemiddelde koffiedrinker.
      De variant Strong is een streling op de tong voor dé koffieliefhebber."
    />
    <section class="content">
      <ul>
        <li v-for="machine in machineList" :key="machine.id">
          <Machine :machine="machine" />
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api';
import Machine from '../../components/product/Machine.vue';
import Box from '../../components/ui-components/Box.vue';

export default createComponent({
  components: {
    Box,
    Machine,
  },
  asyncData({ $axios }: any) {
    return $axios
      .$get(`${$axios.defaults.baseURL}/machines?type=coffee`)
      .then((res: []) => ({ machineList: res }));
  },
});
</script>

<style lang="scss" scoped>
ul {
  li {
    list-style-type: none;
  }
}
</style>

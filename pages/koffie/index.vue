<template>
  <div class="body">
    <Box
      title="WR Koffie"
      content="Onze heerlijke ambachtelijk gebrande bonen komen uit Indonesië en Ethiopië. WR Koffie Classic is een milde koffie, zonder de bittere nasmaak en is geschikt voor de gemiddelde koffiedrinker. De variant Strong is een streling op de tong voor dé koffieliefhebber."
    />
    <section class="content">
      <ul class="productList">
        <li
          v-for="machine in machineList"
          :key="machine.id"
        >
          <MachineGridView :machine="machine" />
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import MachineGridView from '~/components/MachineGridView.vue';
import ProductService from '~/services/product.service.js';
import Box from '@/components/ui-components/Box.vue';

export default {
  components: {
    Box,
    MachineGridView
  },
  asyncData({ $axios }) {
      return $axios.$get(`${ $axios.defaults.baseURL }/machines?type=coffee`)
        .then(res => {
          return { machineList: res }
        })
  }

}
</script>

<style lang="scss" scoped>
</style>


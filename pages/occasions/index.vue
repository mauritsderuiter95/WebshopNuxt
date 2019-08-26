<template>
  <div class="body">
    <Box
      title="Occasion"
      content="Regelmatig bieden wij ervaren automaten aan. Deze automaten zijn volledig gereviseerd en in topconditie. Jarenlang kunt u genieten voor een lage investering in een uitstekend automaat. Voor ons actuele aanbod kijkt u op onze occasion-pagina."
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
      return $axios.$get(`${ $axios.defaults.baseURL }/machines?type=occasion`)
        .then(res => {
          return { machineList: res }
        })
    }

}
</script>

<style lang="scss" scoped>
</style>

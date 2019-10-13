<template>
  <div class="body">
    <Box
      title="Vending"
      content="Kostenloos plaatsen wij frisdrank- en/of zoetwarenautomaten. Wekelijks vullen en onderhouden wij dit automaat, zodat u er geen omkijken naar hebt. Wij ontzorgen u volledig! Neem voor alle mogelijkheden vrijblijvend contact op met Wim de Ruiter op 06 - 143 976 20. Voor elke kantine een passend automaat!"
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
import ProductService from '~/services/product.service';
import Box from '@/components/ui-components/Box.vue';

export default {
  components: {
    Box,
    MachineGridView,
  },
  asyncData({ $axios }) {
    return $axios.$get(`${$axios.defaults.baseURL}/machines?type=vending`)
      .then((res) => ({ machineList: res }));
  },

};
</script>

<style lang="scss" scoped>
</style>

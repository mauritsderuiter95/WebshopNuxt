<template>
  <div class="wrapper">
    <wr-card>
      <wr-img
        :src="machine.photo.url"
        :aspect-ratio="1"
        :alt="machine.photo.alt"
        :title="machine.photo.title"
      />

      <div class="content">
        <h3 class="headline mb-0">
          {{ machine.machineName }}
        </h3>
        <p> {{ machine.description }} </p>
      </div>
      <div class="footer">
        <span class="price">€{{ Number(machine.price).toFixed(2) }}</span>
      </div>
    </wr-card>
  </div>
</template>

<script>
import img from '@/components/ui-components/Image.vue';
import card from '@/components/ui-components/Card.vue';
import btn from '@/components/ui-components/Button.vue';
import Modal from '~/components/ui-components/Modal.vue';

export default {
    components: {
        'wr-img': img,
        'wr-card': card,
    },
    props: {
        // eslint-disable-next-line
        machine: Object
    },
    data() {
      return {
        showModal: false
      }
    },
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  .content {
    margin-top: 4rem;
    margin-bottom: 14rem;
    padding: 0 4rem;
    h3 {
        font-size: 2rem;
    }
    p {
        font-size: 1.8rem;
    }
  }
  .footer {
    margin-top: auto;
    position: absolute;
    bottom: 0;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    .buttons {
      display: flex;
      width: 100%;
      .info-btn {
        margin-right: 1rem;
        display: block;
        width: 100%;
      }
    }
    .price {
      display: block;
      font-size: 2.4rem;
      color: #7C0000;
      font-weight: 700;
      margin-left: auto;
      margin-right: 2rem;
      margin-bottom: 2rem;
    }
  }
}
</style>

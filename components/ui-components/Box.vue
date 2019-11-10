<template>
  <div class="box">
    <div class="intro">
      <div class="content">
        <h2>{{ title }}</h2>
        <p>{{ content }}</p>
      </div>
      <div
        v-if="imageUrl"
        class="image"
      >
        <v-lazy-image
          :src="imageUrl"
        />
      </div>
    </div>
    <div class="slot">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
      default: '',
    },
    content: {
      type: String,
      required: false,
      default: '',
    },
    imageUrl: {
      type: String,
      required: false,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  padding: 10rem 18rem;
  border-radius: $border-radius;
  box-shadow: $box-shadow;
  margin: 0 auto 10rem;
  max-width: 120rem;
  background: #fff;
  .intro {
    display: flex;
    margin-bottom: 3rem;
    .content {
      margin-right: 10rem;
      h2 {
        font-size: 5rem;
        margin-bottom: 2rem;
        font-family: 'Magneto', Helvetica;
        color: $primary-color;
      }
      p {
        font-size: 2rem;
      }
    }
    .image {
      width: 20%;
      img {
        max-width: 100%;
      }
    }
  }
  .slot {
    min-width: 100%;
  }
}

@media screen and (max-width: 1024px) {
  .box {
    padding: 4rem 8rem;
    .content {
      margin-right: 0;
    }
  }
}

@media screen and (max-width: 768px) {
  .box {
    padding: 2rem 4rem;
    margin-bottom: 2rem;
  }
}
</style>

<template>
  <div class="box">
    <div class="content">
      <h2>{{ title }}</h2>
      <p>{{ content }}</p>
    </div>
    <div class="image">
      <v-lazy-image
        :src="imageUrl"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
      default: ""
    },
    content: {
      type: String,
      required: true,
      default: ""
    },
    imageUrl: {
      type: String,
      required: true,
      default: ""
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  padding: 10rem;
  border-radius: 1rem;
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.2);
  margin: 0 auto 20rem;
  max-width: 120rem;
  background: #fff;
  display: flex;
  .content {
    width: 80%;
    margin-right: 10rem;
    h2 {
      font-size: 5rem;
      margin-bottom: 2rem;
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
</style>

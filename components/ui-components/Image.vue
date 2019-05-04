<template>
  <div
    class="responsiveImg"
    role="img"
    :aria-label="alt"
    :title="title"
  >
    <div :style="{ paddingBottom: setHeight }" />
    <div
      class="image"
      :style="{ backgroundImage: 'url(' + src + ')', backgroundPosition: 'center center', backgroundSize: 'cover' }"
    />
    <div class="content" />
  </div>
</template>

<script>
export default {
    props: {
        // eslint-disable-next-line
        src: String,
        // eslint-disable-next-line
        alt: String,
        // eslint-disable-next-line
        title: String,
        // eslint-disable-next-line
        aspectRatio: Number
    },
    computed: {
        setHeight() {
            if (this.aspectRatio) {
                return Math.round(100 / this.aspectRatio * 100) / 100 + '%';
            }
            return '100%'
        }
    },

}
</script>

<style lang="scss" scoped>
.responsiveImg {
    border-radius: inherit;
    position: relative;
    overflow: hidden;
    flex: 1 0 auto;
    display: flex;
    .image {
        border-top-left-radius: inherit;
        border-top-right-radius: inherit;
        background-size: cover;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .content {
        flex: 1 0 0px;
    }
}
</style>

<template>
  <div class="sticky">
    <footer class="bottom">
      <div class="content">
        <section class="information">
          <h2><i class="material-icons">link</i></h2>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/algemene-voorwaarden">Algemene Voorwaarden</a></li>
          </ul>
        </section>
        <section class="social">
          <h2><i class="material-icons">public</i></h2>
          <ul>
            <li><a href="linkedin"><img src="/img/linkedin.png"></a></li>
            <li><a href="facebook"><img src="/img/facebook.png"></a></li>
          </ul>
        </section>
      </div>
    </footer>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.sticky {
  margin-top: auto;
  .bottom {
    clip-path: polygon(0 25%, 100% 0, 100% 100%, 0 100%);
    //background: #1a1c33;
    background: $primary-color;
    border-radius: 0 0 $border-radius $border-radius;
    padding: 18rem 0;
    margin-top: 10rem;
    .content {
      color: #fff;
      display: grid;
      grid-template-columns: 1fr 1fr;
      padding: 0 10rem;
      grid-gap: 10rem;
      h2 {
        text-align: center;
        i {
          font-size: 7.2rem;
        }
      }
      ul {
        list-style-type: none;
        display: flex;
        justify-content: center;
        margin-top: 6rem;
        li {
          margin: 0 2rem;
          height: 3.6rem;
          display: flex;
          a {
            display: block;
            align-self: center;
            font-size: 1.6rem;;
            img {
              width: 3.6rem;
              transition: transform 0.2s;
              &:hover {
                transform: scale(1.2);
              }
            }
          }
        }
      }
    }
  }
}
</style>


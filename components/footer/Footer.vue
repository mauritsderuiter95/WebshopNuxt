<template>
    <div>
        <footer class="bottom">
            <div class="content">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, voluptates. Sapiente itaque eius ducimus modi dolorum non id optio. Non, eligendi architecto provident aperiam id voluptate illo fugit porro sunt!</p>
            </div>
        </footer>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.bottom {
  clip-path: polygon(0 25%, 100% 0, 100% 100%, 0 100%);
  height: 18rem;
  //background: #1a1c33;
  background: $primary-color;
  border-radius: 0 0 .5rem .5rem;
  padding-top: 9rem;
  margin-top: 10rem;
  .content {
    color: #fff;
    text-align: center;
  }
}
</style>


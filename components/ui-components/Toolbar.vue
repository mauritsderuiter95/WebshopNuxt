<template>
  <div>
    <div
      ref="hamburger"
      class="icon hamburger"
      @click="toggleMenu"
    >
      <span />
      <span />
      <span />
    </div>
    <nav
      ref="navbar"
      class="toolbar"
      @click="toggleMenu"
    >
      <slot />
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
      if(this.isOpen) {
        if(this.$refs.navbar) {
          this.$refs.navbar.classList.add('isOpen');
          this.$refs.hamburger.classList.add('open');
        }
      }
      else {
        if(this.$refs.navbar) {
          this.$refs.navbar.classList.add('closing');
          setTimeout(() => {
            this.$refs.navbar.classList.remove('isOpen');
            this.$refs.navbar.classList.remove('closing');
          }, 500);
          this.$refs.hamburger.classList.remove('open');
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.toolbar {
    width: 100%;
    display: flex;
    //box-shadow: 0px 6px 4px -4px rgba(0,0,0,0.2), 0px 9px 5px -5px rgba(0,0,0,0.14), 0px 10px 10px -10px rgba(0,0,0,0.12);
    //border-bottom: 3px solid $primary-color;
    padding: 1rem 1.5rem;
    align-items: center;
}

.hamburger {
  cursor: pointer;
  display: none;
  font-size: 10px;
  height: 6em;
  margin: 2%;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  transition: 0.2s ease-in-out;
  width: 6em;
  -webkit-tap-highlight-color: transparent;
  position: absolute;
  z-index: 5;
  right: 3rem;
  top: 1.5rem;
  span {
    left: 0;
    background: #fff;
    border-radius: 2em;
    -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
    height: 0.8em;
    position: absolute;
    transition: 0.2s ease-in-out;
    width: 100%;
    -webkit-tap-highlight-color: transparent;
    &:nth-child(1) {
        top: 1em;
      }
    &:nth-child(2) {
      top: 2.6em;
    }
    &:nth-child(3) {
      top: 4.2em;
    }
  }
}
.open {
  span {
    &:nth-child(1) {
      -webkit-transform: rotate(45deg) translate(1.1em, 1.1em);
              transform: rotate(45deg) translate(1.1em, 1.1em);
    }
    &:nth-child(2) {
      opacity: 0;
    }
    &:nth-child(3) {
      -webkit-transform: rotate(-45deg) translate(1.1em, -1.1em);
              transform: rotate(-45deg) translate(1.1em, -1.1em);
    }
  }
}

@media screen and (max-width: 1024px) {
  .hamburger {
    display: inline-block;
  }
  .toolbar {
    display: grid;
    grid-template-columns: 1fr;
    padding: 7rem 15rem;
    grid-row-gap: 2rem;
    transition: transform .5s;
    position: absolute;
    transform: translateY(-100vh);
    z-index: -1;
    background: $primary-color;
    top: 0;
    left: 0;
  }
  .isOpen {
    z-index: 1;
    transform: translateY(0);
  }
  .closing {
    transform: translateY(-100vh);
  }
}

@media screen and (max-width: 426px) {
  .toolbar {
    padding: 7rem 7rem;
    grid-row-gap: 2rem;
  }
}
</style>

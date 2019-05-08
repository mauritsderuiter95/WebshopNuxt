<template>
  <button
    ref="btn"
    :class="['btn', { dark }, { block }, { flat }, { big }, { medium }, { outline }, color]"
    :type="submit > 1 ? submit : 'button'"
    @click="callback($event)"
  >
    <slot>Button</slot>
  </button>
</template>

<script>

export default {
    props: {
        dark: Boolean,
        // eslint-disable-next-line
        color: String,
        // eslint-disable-next-line
        onClick: Function,
        block: Boolean,
        flat: Boolean,
        big: Boolean,
        // eslint-disable-next-line
        submit: String,
        medium: Boolean,
        outline: Boolean
    },
    methods: {
        callback(e) {
            this.$emit('click', e);
        }
    }
}
</script>

<style lang="scss" scoped>
.btn {
    cursor: pointer;
    background: none;
    color: rgba(0,0,0,0.9);
    box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12);
    padding: 0.3rem 1rem;
    border: none;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    text-decoration: none;
    position: relative;
    font-size: inherit;
    i {
        color: rgba(0,0,0,0.9);
    }
    &::before {
        content: '';
        background-color: rgba(0,0,0,.5);
        border-radius: 50%;
        display: block;
        position: absolute;
        top: -250%;
        right: -50%;
        bottom: -250%;
        left: -50%;
        transform: scale(0.001, 0.001);
    }
    &:focus {
        outline: none;
        &:before {
            animation: effect_dylan 1s ease-out;
        }
    }
}
.dark {
    color: #fff;
    i {
        color: #fff;
    }
    &::before {
        background-color: rgba(255,255,255,.5);
    }
}
.block {
    width: 100%;
}
.flat {
    box-shadow: none
}
.big {
    font-size: 2rem;
    padding: 2rem;
}
.medium {
  font-size: 1.8rem;
  padding: 1rem;
}
.outline {
  border: 2px solid #000;
}
.primary {
    background-color: $primary-color !important;
    &:hover {
        background-color: lighten($primary-color, 3) !important;
    }
}
.outline.primary {
  border: 2px solid $primary-color;
  background-color: transparent !important;
  transition: 0.5s;
  &:hover {
    background-color: $primary-color!important;
    color: #fff;
  }
}
.white {
    background-color: #fff !important;
}

@keyframes effect_dylan {
  50% {
    transform: scale(1.5, 1.5);
    opacity: 0;
  }
  99% {
    transform: scale(0.001, 0.001);
    opacity: 0;
  }
  100% {
    transform: scale(0.001, 0.001);
    opacity: 1;
  }
}
</style>

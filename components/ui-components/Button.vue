<template>
    <button @click="callback($event)" ref="btn" :class="['btn', { dark: dark }, { block: block }, { flat: flat }, color]">
        <slot>Button</slot>
    </button>
</template>

<script>
export default {
    props: {
        dark: Boolean,
        color: String,
        onClick: Function,
        block: Boolean,
        flat: Boolean
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
    color: #fff;
    box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12);
    padding: 0.3rem;
    border-radius: 2px;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    i {
        color: #fff;
    }
}
.dark {
    color: $primary-color;
}
.block {
    width: 100%;
}
.flat {
    box-shadow: none
}
.primary {
    background-color: $primary-color !important;
}
</style>

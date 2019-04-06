<template>
    <nav class="toolbar">
        <slot></slot>
    </nav>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.toolbar {
    width: 100%;
    display: flex;
    //box-shadow: 0px 6px 4px -4px rgba(0,0,0,0.2), 0px 9px 5px -5px rgba(0,0,0,0.14), 0px 10px 10px -10px rgba(0,0,0,0.12);
    border-bottom: 3px solid $primary-color;
    padding: 1rem 1.5rem;
}
</style>
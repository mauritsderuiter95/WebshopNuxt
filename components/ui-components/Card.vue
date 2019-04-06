<template>
    <div class="card">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        image: Object,
    }
    
}
</script>

<style lang="scss" scoped>
.card {
    background: #fff;
    border-radius: 2px;
    transition: 0.3s;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2), 0 0 20px 0 rgba(0,0,0,0.1), 0 3px 3px -2px rgba(0,0,0,0.3);
    height: 100%;
    position: relative;
}
</style>
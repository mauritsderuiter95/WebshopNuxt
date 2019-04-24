<template>
    <aside class="sidebar">
        <Search />
        <div class="menu">
            <Catmenu />
        </div>
        <div class="menu">
            <Usermenu />
        </div>
    </aside>
</template>

<script>
import Search from '~/components/Search.vue';
import Usermenu from '~/components/Usermenu.vue';
import Catmenu from '~/components/Catmenu.vue';

export default {
    components: {
        Search,
        Usermenu,
        Catmenu,
    }
}
</script>

<style lang="scss" scoped>
.sidebar {
    width: 20%;
    margin-left: 3rem;
    .menu {
        background: #fff;
        border-radius: 4px;
        transition: 0.3s;
        box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
        padding: 3rem;
        margin-top: 6rem;
    }
}
</style>

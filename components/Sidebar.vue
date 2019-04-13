<template>
    <aside class="sidebar">
        <Search />
        <Catmenu />
        <Usermenu />
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
}
</style>

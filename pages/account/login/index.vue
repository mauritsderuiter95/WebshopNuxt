<template>
    <div>
        <form @submit.prevent="submit($event)">
            <input type="text" name="username" id="username" placeholder="username" />
            <input type="password" name="password" id="password" placeholder="password" />
            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            auth: {}
        }
    },
    methods: {
        submit(event) {
            console.log(event);
            this.auth.username = event.target.elements.username.value;
            this.auth.password = event.target.elements.password.value;
            this.auth.isLogin = true;
            this.$store.dispatch('authenticateUser', this.auth);

        }
    }
}
</script>

<style lang="scss" scoped>

</style>


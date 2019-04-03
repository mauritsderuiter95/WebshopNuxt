<template>
    <div class="page">
        <div class="box">
            <transition name="notification">
                <div class="message" v-show="error">
                    <i class="material-icons">error</i>{{ error }}
                </div>
            </transition>
            <div class="boxContent">
                <h1>Inloggen</h1>
                <form @submit.prevent="submit($event)">
                    <transition name="loader" mode="out-in">
                        <div class="inputs" v-if="!loading" key="form">
                            <div class="inputGroup">
                                <label>Username:</label>
                                <div class="icon"><i class="material-icons">face</i></div><input type="text" name="username" id="username" placeholder="username" />
                            </div>
                            <div class="inputGroup">
                                <label>Password:</label>
                                <div class="icon"><i class="material-icons">lock</i></div><input type="password" name="password" id="password" placeholder="password" />
                            </div>
                        </div>
                        <div class="loader" v-else key="spinner">
                            <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                        </div>
                    </transition>
                    <button type="submit">Log in</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            auth: {},
            error: null,
            loading: false
        }
    },
    methods: {
        submit(event) {
            if(!event.target.elements.username.value)
                 return this.error = "Please specify your username."
            if(!event.target.elements.password.value)
                return this.error = "Please enter your password.";
            this.auth.username = event.target.elements.username.value;
            this.auth.password = event.target.elements.password.value;
            this.auth.isLogin = true;
            this.loading = true;
            this.error = null;
            setTimeout(() => {
                this.$store.dispatch('user/authenticateUser', this.auth)
                .then ((result) => {
                    console.log("in the promise.");
                    if(!this.$route.query.returnpath)
                        this.$router.push('/account');
                    else
                        this.$router.push(`/${this.$route.query.returnpath}`)
                })
                .catch((e) => {
                    console.log("in the catch.");
                    this.loading = false;
                    this.error = "Please check your credentials."
                });
            }, 2000);
        }
    },
    layout: 'product',
    middleware: 'authTrue'
}
</script>

<style lang="scss" scoped>
.loader-enter {
    opacity: 0;
}
.loader-leave-to {
    transform: translateX(50rem)
}
.loader-enter-active, .loader-leave-active {
    transition: 1s;
}

.notification-enter {
    opacity: 0;
}

.notification-enter-active {
    animation: wiggle .5s;
    transition: .5s;
}

.notification-leave-to {
    opacity: 0;
}

.notification-leave-active {
    transition: .5s;
}

@keyframes wiggle {
    0% {
        transform: translateX(0);
    }
    5% {
        transform: translateX(-1rem);
    }
    15% {
        transform: translateX(1rem);
    }
    25% {
        transform: translateX(-1rem);
    }
    35% {
        transform: translateX(1rem);
    }
    45% {
        transform: translateX(-1rem);
    }
    55% {
        transform: translateX(1rem);
    }
    65% {
        transform: translateX(-1rem);
    }
    75% {
        transform: translateX(1rem);
    }
    85% {
        transform: translateX(-1rem);
    }
    95% {
        transform: translateX(1rem);
    }
    100% {
        transform: translateX(0);
    }
}

.page {
    height: 100vh;
    position: relative;
    overflow: hidden;
    background-color: #00b7ff;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='540' height='450' viewBox='0 0 1080 900'%3E%3Cg fill-opacity='.1'%3E%3Cpolygon fill='%23444' points='90 150 0 300 180 300'/%3E%3Cpolygon points='90 150 180 0 0 0'/%3E%3Cpolygon fill='%23AAA' points='270 150 360 0 180 0'/%3E%3Cpolygon fill='%23DDD' points='450 150 360 300 540 300'/%3E%3Cpolygon fill='%23999' points='450 150 540 0 360 0'/%3E%3Cpolygon points='630 150 540 300 720 300'/%3E%3Cpolygon fill='%23DDD' points='630 150 720 0 540 0'/%3E%3Cpolygon fill='%23444' points='810 150 720 300 900 300'/%3E%3Cpolygon fill='%23FFF' points='810 150 900 0 720 0'/%3E%3Cpolygon fill='%23DDD' points='990 150 900 300 1080 300'/%3E%3Cpolygon fill='%23444' points='990 150 1080 0 900 0'/%3E%3Cpolygon fill='%23DDD' points='90 450 0 600 180 600'/%3E%3Cpolygon points='90 450 180 300 0 300'/%3E%3Cpolygon fill='%23666' points='270 450 180 600 360 600'/%3E%3Cpolygon fill='%23AAA' points='270 450 360 300 180 300'/%3E%3Cpolygon fill='%23DDD' points='450 450 360 600 540 600'/%3E%3Cpolygon fill='%23999' points='450 450 540 300 360 300'/%3E%3Cpolygon fill='%23999' points='630 450 540 600 720 600'/%3E%3Cpolygon fill='%23FFF' points='630 450 720 300 540 300'/%3E%3Cpolygon points='810 450 720 600 900 600'/%3E%3Cpolygon fill='%23DDD' points='810 450 900 300 720 300'/%3E%3Cpolygon fill='%23AAA' points='990 450 900 600 1080 600'/%3E%3Cpolygon fill='%23444' points='990 450 1080 300 900 300'/%3E%3Cpolygon fill='%23222' points='90 750 0 900 180 900'/%3E%3Cpolygon points='270 750 180 900 360 900'/%3E%3Cpolygon fill='%23DDD' points='270 750 360 600 180 600'/%3E%3Cpolygon points='450 750 540 600 360 600'/%3E%3Cpolygon points='630 750 540 900 720 900'/%3E%3Cpolygon fill='%23444' points='630 750 720 600 540 600'/%3E%3Cpolygon fill='%23AAA' points='810 750 720 900 900 900'/%3E%3Cpolygon fill='%23666' points='810 750 900 600 720 600'/%3E%3Cpolygon fill='%23999' points='990 750 900 900 1080 900'/%3E%3Cpolygon fill='%23999' points='180 0 90 150 270 150'/%3E%3Cpolygon fill='%23444' points='360 0 270 150 450 150'/%3E%3Cpolygon fill='%23FFF' points='540 0 450 150 630 150'/%3E%3Cpolygon points='900 0 810 150 990 150'/%3E%3Cpolygon fill='%23222' points='0 300 -90 450 90 450'/%3E%3Cpolygon fill='%23FFF' points='0 300 90 150 -90 150'/%3E%3Cpolygon fill='%23FFF' points='180 300 90 450 270 450'/%3E%3Cpolygon fill='%23666' points='180 300 270 150 90 150'/%3E%3Cpolygon fill='%23222' points='360 300 270 450 450 450'/%3E%3Cpolygon fill='%23FFF' points='360 300 450 150 270 150'/%3E%3Cpolygon fill='%23444' points='540 300 450 450 630 450'/%3E%3Cpolygon fill='%23222' points='540 300 630 150 450 150'/%3E%3Cpolygon fill='%23AAA' points='720 300 630 450 810 450'/%3E%3Cpolygon fill='%23666' points='720 300 810 150 630 150'/%3E%3Cpolygon fill='%23FFF' points='900 300 810 450 990 450'/%3E%3Cpolygon fill='%23999' points='900 300 990 150 810 150'/%3E%3Cpolygon points='0 600 -90 750 90 750'/%3E%3Cpolygon fill='%23666' points='0 600 90 450 -90 450'/%3E%3Cpolygon fill='%23AAA' points='180 600 90 750 270 750'/%3E%3Cpolygon fill='%23444' points='180 600 270 450 90 450'/%3E%3Cpolygon fill='%23444' points='360 600 270 750 450 750'/%3E%3Cpolygon fill='%23999' points='360 600 450 450 270 450'/%3E%3Cpolygon fill='%23666' points='540 600 630 450 450 450'/%3E%3Cpolygon fill='%23222' points='720 600 630 750 810 750'/%3E%3Cpolygon fill='%23FFF' points='900 600 810 750 990 750'/%3E%3Cpolygon fill='%23222' points='900 600 990 450 810 450'/%3E%3Cpolygon fill='%23DDD' points='0 900 90 750 -90 750'/%3E%3Cpolygon fill='%23444' points='180 900 270 750 90 750'/%3E%3Cpolygon fill='%23FFF' points='360 900 450 750 270 750'/%3E%3Cpolygon fill='%23AAA' points='540 900 630 750 450 750'/%3E%3Cpolygon fill='%23FFF' points='720 900 810 750 630 750'/%3E%3Cpolygon fill='%23222' points='900 900 990 750 810 750'/%3E%3Cpolygon fill='%23222' points='1080 300 990 450 1170 450'/%3E%3Cpolygon fill='%23FFF' points='1080 300 1170 150 990 150'/%3E%3Cpolygon points='1080 600 990 750 1170 750'/%3E%3Cpolygon fill='%23666' points='1080 600 1170 450 990 450'/%3E%3Cpolygon fill='%23DDD' points='1080 900 1170 750 990 750'/%3E%3C/g%3E%3C/svg%3E");
    display: flex;
    justify-content: center;
    align-items: center;
    .box {
        width: 50rem;
        position: relative;
        .message {
            position: absolute;
            border-radius: 0.5rem;
            background: #ff234f;
            margin-bottom: 2rem;
            width: 100%;
            color: #fff;
            display: flex;
            align-items: center;
            padding: 2rem;
            top: -9rem;
            i {
                margin-right: 1rem;
            }
        }
        .boxContent {
            border-radius: 0.5rem;
            background: rgba(255,255,255,1);
            overflow: hidden;
            h1 {
                color: #fff;
                background: #006b96;
                padding: 2rem;
            }
            form {
                padding: 2rem;
                .inputs {
                    margin-bottom: 2rem;
                    .inputGroup {
                        display: flex;
                        flex-wrap: wrap;
                        margin-bottom: 2rem;
                        label {
                            display: block;
                            width: 100%;
                            font-weight: 700;
                            color: #006b96;
                            font-size: 1.6rem;
                            margin-bottom: 0.5rem;
                        }
                        .icon {
                            width: 6rem;
                            height: 6rem;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            background: #006b96;
                            color: #fff;
                        }
                        input {
                            width: calc(100% - 6rem);
                            border: none;
                            padding: 2rem;
                            font-size: 1.6rem;
                            position: relative;
                            border: 1px solid #006b96;
                        }
                    }
                }
                button {
                    width: 100%;
                    padding: 2rem;
                    font-size: 1.6rem;
                    background: #006b96;
                    text-align: center;
                    color: #fff;
                    font-weight: 700;
                    border-radius: 5px;
                    border: none;
                    cursor: pointer;
                    &:hover {
                        background: darken(#006b96, 5%);
                    }
                }
            }
            .loader {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 18.8rem;
                margin-top: 0;
                margin-bottom: 2rem;
                .lds-spinner {
                    color: official;
                    display: inline-block;
                    position: relative;
                    width: 64px;
                    height: 64px;
                    div {
                        transform-origin: 32px 32px;
                        animation: lds-spinner 1.2s linear infinite;
                        &::after {
                            content: " ";
                            display: block;
                            position: absolute;
                            top: 3px;
                            left: 29px;
                            width: 5px;
                            height: 14px;
                            border-radius: 20%;
                            background: #006b96;
                        }
                        &:nth-child(1) {
                            transform: rotate(0deg);
                            animation-delay: -1.1s;
                        }
                        &:nth-child(2) {
                            transform: rotate(30deg);
                            animation-delay: -1s;
                        }
                        &:nth-child(3) {
                            transform: rotate(60deg);
                            animation-delay: -0.9s;
                        }
                        &:nth-child(4) {
                            transform: rotate(90deg);
                            animation-delay: -0.8s;
                        }
                        &:nth-child(5) {
                            transform: rotate(120deg);
                            animation-delay: -0.7s;
                        }
                        &:nth-child(6) {
                            transform: rotate(150deg);
                            animation-delay: -0.6s;
                        }
                        &:nth-child(7) {
                            transform: rotate(180deg);
                            animation-delay: -0.5s;
                        }
                        &:nth-child(8) {
                            transform: rotate(210deg);
                            animation-delay: -0.4s;
                        }
                        &:nth-child(9) {
                            transform: rotate(240deg);
                            animation-delay: -0.3s;
                        }
                        &:nth-child(10) {
                            transform: rotate(270deg);
                            animation-delay: -0.2s;
                        }
                        &:nth-child(11) {
                            transform: rotate(300deg);
                            animation-delay: -0.1s;
                        }
                        &:nth-child(12) {
                            transform: rotate(330deg);
                            animation-delay: 0s;
                        }
                    }
                }
                @keyframes lds-spinner {
                    0% {
                        opacity: 1;
                    }
                    100% {
                        opacity: 0;
                    }
                }

            }
        }
    }  
}

</style>


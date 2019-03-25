import Cookie from 'js-cookie';

const api = 'https://localhost:44337/api/carts';

const state = () => ({
    currentCart: null,
});

const mutations = ({
    setCart(state, cart) {
      state.currentCart = cart;
    },
    clearCart(state) {
      state.currentCart = null;
    }
});

const actions = {
    editCart({commit}, product) {
        let cartProduct = {};
        cartProduct.productId = product.id;
        cartProduct.count = 1;
        if(this.state.cart.currentCart) {
            this.$axios.$put(`${api}/${ this.state.cart.currentCart.id }`, cartProduct)
            .then((response) => {
                Cookie.set("Cart", response.id);
                commit("setCart", response);
            });
        }
        else {
            this.$axios.$post(`${api}`, cartProduct)
            .then((response) => {
                Cookie.set("Cart", response.id);
                commit("setCart", response);
            });
        }
    },
    deleteCart({commit},vuexContext) {
        const cartCookie = req.headers.cookie
        .split(";")
        .find(c => c.trim().startsWith("Cart="))
        .split("=");
        if(cartCookie) {
            let cart = JSON.parse(cartCookie[1]);
        }
        this.$axios.$delete(`${api}/${cart.id}`)
        .then(Cookie.delete("Cart"))
        .then(commit("clearCart"));
    },
    getCart({commit}, req) {
        if(!req)
            return null;
        let cartCookie;
        if(req.headers.cookie) {
            cartCookie = req.headers.cookie
            .split(";")
            .find(c => c.trim().startsWith("Cart="))
            .split("=");
        }
        if(cartCookie) {
            if(cartCookie[1] != 'undefined') {
                let cartId = cartCookie[1];
                this.$axios.get(`${api}/${cartId}`)
                .then((response) => {
                    let cart = JSON.parse('{"id":"-2","products":"[]"}');
                    commit("setCart", cart);
                });
            }
        }
        else {
            return null;
        }
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
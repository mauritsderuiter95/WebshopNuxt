import Cookie from 'js-cookie';

const api = 'https://localhost:44337/api/carts';

const state = () => ({
    currentCart: {},
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
    addToCart({commit}, product) {
        let cartProduct = {};
        cartProduct.productId = product.id;
        cartProduct.count = 1;
        if(this.state.cart.currentCart) {
            this.$axios.$patch(`${api}/${ this.state.cart.currentCart.id }`, cartProduct)
            .then((response) => {
                Cookie.set("Cart", response.id, { expires: 365 });
                commit("setCart", response);
            });
        }
        else {
            this.$axios.$post(`${api}`, cartProduct)
            .then((response) => {
                Cookie.set("Cart", response.id, { expires: 365 });
                commit("setCart", response);
            });
        }
    },
    editCart({commit}, cart) {
        if(this.state.cart.currentCart) {
            this.$axios.$put(`${api}/${ this.state.cart.currentCart.id }`, cart)
            .then((response) => {
                Cookie.set("Cart", response.id, { expires: 365 });
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
    async getCart({commit}, req) {
        let cartCookie;
        // Check if there's a cookie available
        if(req.headers.cookie) {
            cartCookie = req.headers.cookie
            .split(";")
            .find(c => c.trim().startsWith("Cart="));
            // Check if there's a cookie for the cart
            if(cartCookie)
                cartCookie = cartCookie.split("=");
            else
                cartCookie = null;
        }
        // Check if the cart cookie is set
        if(cartCookie) {
            // Check if the cart cookie isn't empty
            if(cartCookie[1] != 'undefined') {
                let cartId = cartCookie[1];
                // Get the cart from the backend
                await this.$axios.get(`${api}/${cartId}`)
                .then((response) => {
                    let cart = response.data;
                    // Set the cart in the state
                    commit("setCart", cart);
                })
                .catch(() => {
                    commit("clearCart");
                });
            }
        }
        else {
            // Clear the cart in the state
            await commit("clearCart");
        }
    }
};

const getters = {
    currentCart(state) {
        return state.currentCart;
    }
  };

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
import { reactive, SetupContext } from '@vue/composition-api';
import cloneDeep from 'lodash/cloneDeep';
import CartProduct from '../../models/CartProduct';

export default function setup(props: any, ctx: SetupContext) {
  const cart = cloneDeep(ctx.root.$store.getters['cart/currentCart']);

  const state = reactive({
    cart,
  });

  function editCart(value: Number, productId: string) {
    if (value >= 1) {
      Object.entries(cart.products).forEach(([key]) => {
        if (cart.products[key].productId === productId) {
          cart.products[key].count = value;
        }
      });

      ctx.root.$store.dispatch('cart/editCart', cart);
    }
  }

  function addProduct(productId: string) {
    Object.entries(cart.products).forEach(([key]) => {
      if (cart.products[key].productId === productId) {
        cart.products[key].count += 1;
      }
    });

    ctx.root.$store.dispatch('cart/editCart', cart);
  }

  function deleteProduct(productId: string) {
    cart.products = cart.products.filter((item: any) => item.productId !== productId);
    ctx.root.$store.dispatch('cart/editCart', cart);
  }

  function removeProduct(product: CartProduct) {
    if (product.count >= 2) {
      Object.entries(cart.products).forEach(([key]) => {
        if (cart.products[key].productId === product.productId) {
          cart.products[key].count -= 1;
        }
      });

      ctx.root.$store.dispatch('cart/editCart', cart);
    } else {
      deleteProduct(product.productId);
    }
  }

  return {
    props,
    state,
    editCart,
    addProduct,
    deleteProduct,
    removeProduct,
  };
}

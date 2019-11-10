/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import {
  reactive, SetupContext, onMounted, computed,
} from '@vue/composition-api';
import cloneDeep from 'lodash/cloneDeep';
import User from '../../../models/User';
import Cart from '../../../models/Cart';
import checkFormErrors from '../../../logic/checkFormErrors';
import CartProduct from '../../../models/CartProduct';
import Order from '../../../models/Order';

export default function setup(props : never, ctx : SetupContext) {
  const user : User = new User();
  const step1 : Boolean = true;
  const payMethod : string = '';
  const sendMethod : string = '';
  const cartExpanded : Boolean = false;

  const state : any = reactive({
    user,
    step1,
    payMethod,
    sendMethod,
    cartExpanded,
    cart: computed(() : Cart => {
      if (ctx.root.$store.getters['cart/currentCart']) {
        return ctx.root.$store.getters['cart/currentCart'];
      }
      return new Cart();
    }),
    subtotal: computed(() : number => state.cart.products.reduce(
      (acc : number, item : CartProduct) => acc + item.productPrice * item.count,
      0,
    )),
    sendingCosts: 0,
    total: 0,
  });

  onMounted(() => {
    if (ctx.root.$store.getters['user/currentUser']) {
      if (ctx.root.$store.getters['user/currentUser'].firstName) {
        state.user = cloneDeep(ctx.root.$store.getters['user/currentUser']);
      }
    }
    state.total = state.subtotal;
  });

  function signIn() {
    ctx.root.$router.push('/account/login?returnpath=cart/checkout');
  }

  async function nextStep() {
    const {
      step1Observer, error, contact, sending,
    } = ctx.refs;

    if (!(await checkFormErrors(step1Observer))) {
      error.style.display = 'block';
      error.textContent = 'Niet alle vereiste velden zijn correct ingevuld.';
      return;
    }
    error.style.display = 'none';
    state.step1 = false;
    contact.classList.remove('active');
    sending.classList.add('active');
    ctx.root.$store.dispatch('user/saveGuest', cloneDeep(state.user));
  }

  function previousStep() {
    const { contact, sending } = ctx.refs;
    state.step1 = true;
    contact.classList.add('active');
    sending.classList.remove('active');
  }

  function calcCosts(postnl : boolean) {
    const { sendingCosts } = ctx.refs;
    if (postnl) {
      state.sendingCosts = 4.99;
      state.total = state.subtotal + state.sendingCosts;
      sendingCosts.textContent = '€4,99';
    } else {
      sendingCosts.textContent = 'Gratis';
      state.total = state.subtotal;
    }
  }

  async function finishOrder() {
    const { step2Observer, error2 } = ctx.refs;
    if (!(await checkFormErrors(step2Observer))) {
      error2.style.display = 'block';
      error2.textContent = 'Niet alle vereiste velden zijn correct ingevuld.';
      return;
    }

    error2.style.display = 'none';

    const cart = (ctx.root.$store.getters['cart/currentCart'] as Cart);
    const order = new Order();
    order.products = cart.products;
    order.cartId = cart.id;
    order.sendingCosts = state.sendingCosts;
    order.ideal = state.payMethod === 'ideal';
    order.user = state.user;

    (ctx.root as any).$axios.$post(`${(ctx.root as any).$axios.defaults.baseURL}/orders`, order)
      .then((res : Order) => {
        if (res.ideal) {
          // @ts-ignore
          window.location = res.orderPayment._links.checkout.href;
          return;
        }
        window.location = ((`https://www.wrautomaten.nl/orders/${res.id}?key=${res.key}` as unknown) as Location);
      })
      .catch((err : string) => {
        console.log(err);
      });
  }

  function expandCart() {
    state.cartExpanded = !state.cartExpanded;
    if (state.cartExpanded) {
      ctx.refs.cart.style.display = 'block';
      ctx.refs.icon.classList.add('rotate');
      ctx.refs.cartLabel.textContent = 'Verberg winkelwagen';
    } else {
      ctx.refs.cart.style.display = 'none';
      ctx.refs.icon.classList.remove('rotate');
      ctx.refs.cartLabel.textContent = 'Bekijk winkelwagen';
    }
  }

  return {
    props,
    state,
    signIn,
    nextStep,
    previousStep,
    calcCosts,
    finishOrder,
    expandCart,
  };
}

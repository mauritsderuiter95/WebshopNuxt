export default function(context) {
    context.store.dispatch("cart/getCart", context.req);
  }
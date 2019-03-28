export default function(context) {
    if (!context.store.getters['user/isAuthenticated']) {
      console.log(context.store.getters['user/isAuthenticated']);
      context.redirect("/account/login");
    }
  }
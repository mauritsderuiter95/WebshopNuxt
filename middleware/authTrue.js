export default function(context) {
    if (context.store.getters['user/isAuthenticated']) {
      console.log(context);
      if(!context.query.returnpath)
        context.redirect("/account");
      else
        context.redirect(`/${context.query.returnpath}`);
    }
  }
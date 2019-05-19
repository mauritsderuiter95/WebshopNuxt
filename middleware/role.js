import axios from 'axios';
import https from 'https';

const agent = new https.Agent({
  rejectUnauthorized: false
})

export default function(context) {
  if (!context.store.getters['user/currentUser'] || context.store.getters['user/currentUser'].role != 'Admin') {
    context.redirect("/admin");
  }
}

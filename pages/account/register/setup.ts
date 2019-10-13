/* eslint-disable no-param-reassign */
import { SetupContext, reactive } from '@vue/composition-api';
import User from '../../../models/User';
import checkFormErrors from '../../../logic/checkFormErrors';

export default function setup(props: any, ctx: SetupContext) {
  const user: User = new User();

  const state = reactive({
    user,
  });

  async function signUp(observer: any, error: any) {
    if (!await checkFormErrors(observer)) {
      return;
    }

    (ctx.root as any).$axios
      .$post(
        `${(ctx.root as any).$axios.defaults.baseURL}/users`,
        state.user,
      )
      .then(() => {
        ctx.root.$router.push('/account/register/result');
      })
      .catch((e: any) => {
        error.style.display = 'block';
        if (e.response) {
          if (e.response.data) {
            error.textContent = e.response.data.message;
          } else {
            error.textContent = e.response.data;
          }
        } else {
          error.textContent = 'Er ging iets mis. Neem contact op met de leverancier.';
        }
      });
  }

  return {
    props,
    state,
    signUp,
  };
}

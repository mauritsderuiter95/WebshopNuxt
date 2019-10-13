/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import { onMounted, SetupContext, reactive } from '@vue/composition-api';
import cloneDeep from 'lodash/cloneDeep';
import User from '../../../models/User';
import JsonPatch from '../../../models/JsonPatch';
import checkFormErrors from '../../../logic/checkFormErrors';


export default function setup(props : any, ctx : SetupContext) {
  const user: User = new User();
  const password2: string = '';

  const state = reactive({
    user,
    password2,
  });

  onMounted(() => {
    const vuexUser : User = ctx.root.$store.getters['user/currentUser'];
    if (vuexUser) {
      if (vuexUser.firstName) {
        state.user = cloneDeep(vuexUser);
      }
    }
    state.user.password = '';
  });

  async function postData(observer : any) {
    if (!checkFormErrors(observer)) {
      return;
    }

    const jsonPatchDocument : JsonPatch[] = [];

    Object.entries(state.user).forEach(([key, val]) => {
      if (val !== ctx.root.$store.getters['user/currentUser'][key]) {
        const jsonPatch = new JsonPatch('replace', `/${key}`, val);
        jsonPatchDocument.push(jsonPatch);
      }
    });

    (ctx.root as any).$axios
      .$patch(
        `${(ctx.root as any).$axios.defaults.baseURL}/users/${state.user.id}`,
        jsonPatchDocument,
      )
      .then((res : User) => {
        ctx.root.$store.dispatch('user/setUser', res);
        ctx.root.$router.push('/account');
      });
  }

  return {
    props,
    state,
    postData,
  };
}

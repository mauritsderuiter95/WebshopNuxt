<template>
  <div class="callback">
    <header @click="() => toggleShow()">
      <h3>Gebeld worden?</h3>
      <span v-if="state.show || state.success" class="material-icons">close</span>
    </header>
    <div v-if="state.success" class="content">
      <p>Het terugbelverzoek is succesvol verstuurd.</p>
      <p>Wij nemen zo snel mogelijk contact met u op!</p>
    </div>
    <div v-if="state.show" class="content">
      <p>Mogen wij u vertellen hoe uw bedrijf beter wordt met koffie van WR Automaten?</p>
      <p>Vul uw naam en telefoonnummer in en laat u overtuigen!</p>
      <div v-if="state.error" class="error">Naam of telefoonnummer incorrect</div>
      <div class="holder">
        <div class="icon">
          <span class="material-icons">account_circle</span>
        </div>
        <input id="name" v-model="state.name" type="text" name="name" placeholder="Jan Smit" />
      </div>
      <div class="holder">
        <div class="icon">
          <span class="material-icons">phone</span>
        </div>
        <input id="phone" v-model="state.phone" type="text" name="phone" placeholder="0180234567" />
      </div>
      <wr-btn
        color="primary"
        dark
        block
        medium
        type="submit"
        @click="() => sendCallBack()"
      >Bel mij terug!</wr-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent, reactive, onMounted } from '@vue/composition-api';
import Button from './ui-components/Button.vue';

export default createComponent({
  components: {
    'wr-btn': Button,
  },
  setup(props, ctx) {
    const show: Boolean = true;
    const success: Boolean = false;
    const error: Boolean = false;
    const name: string = '';
    const phone: string = '';

    const state = reactive({
      show,
      name,
      phone,
      success,
      error,
    });

    onMounted(async () => {
      await (ctx.root as any).$recaptcha.init();
      if (process.client) {
        const mobile = window.matchMedia('(max-width: 1024px)');
        if (mobile.matches) state.show = false;
      }
    });

    function toggleShow() {
      if (!state.success) {
        state.show = !state.show;
      }
      state.success = false;
    }

    async function sendCallBack() {
      const phoneWorks = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/g.test(state.phone);
      const nameWorks = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g.test(state.name);
      if (!phoneWorks && !nameWorks) {
        state.error = true;
        return;
      }
      const token = await (ctx.root as any).$recaptcha.execute('callback');
      try {
        await (ctx.root as any).$axios.$post(
          `${(ctx.root as any).$axios.defaults.baseURL}/callbacks`,
          {
            name: state.name,
            phone: state.phone,
            token,
          },
        );
        state.show = false;
        state.success = true;
      } catch {
        state.error = true;
      }
    }

    return {
      props,
      ctx,
      state,
      toggleShow,
      sendCallBack,
    };
  },
});
</script>

<style lang="scss" scoped>
.callback {
  position: fixed;
  bottom: 4rem;
  right: 4rem;
  border-radius: $border-radius;
  overflow: hidden;
  width: 35rem;
  background: #fff;
  border: 1px solid #fff;
  z-index: 999;
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.2);
  header {
    background: $primary-color;
    color: #fff;
    padding: 1rem 2rem;
    position: relative;
    span {
      position: absolute;
      right: 0.5rem;
      top: 0.5rem;
      font-size: 3rem;
    }
  }
  .content {
    padding: 2rem;
    .error {
      border-radius: $border-radius;
      background: #ff9494;
      padding: 1rem;
    }
    .holder {
      width: 100%;
      position: relative;
      font-size: 1.8rem;
      line-height: 1.5;
      background-color: #fff;
      background-image: none;
      box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
      border: none;
      border-radius: 0.25rem;
      margin: 1rem 0;
      height: 32px;
      overflow: hidden;
      span {
        height: 100%;
        height: 32px;
        width: 32px;
        padding: 0.4rem;
        color: #fff;
        background: $primary-color;
      }
      input {
        border: none;
        padding: 0.7rem 1rem;
        position: absolute;
        top: 0;
        width: calc(100% - 32px);
        left: 32px;
        font-size: 1.6rem;
      }
    }
    p {
      margin-bottom: 1rem;
      &:last-of-type {
        margin-bottom: 2rem;
      }
    }
  }
}

@media screen and (max-width: 1024px) {
  .callback {
    max-width: 90%;
    width: inherit;
    right: 5%;
  }
}
</style>

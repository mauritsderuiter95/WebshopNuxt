<template>
  <div class="holder">
    <div class="left">
      <svg viewBox="0 0 18 73" class="desktop">
        <text x="-73" y="15">ELPROMA</text>
      </svg>
      <svg viewBox="0 0 73 18" class="mobile">
        <text x="0" y="15">ELPROMA</text>
      </svg>
    </div>
    <div class="right">
      <div class="info-holder">
        <div class="image">
          <img :src="machine.photo.url" :alt="machine.photo.alt" :title="machine.photo.title" />
        </div>
        <div class="info">
          <header>
            <h3>{{ state.model }}</h3>
            <h4>€{{ Number(machine.price).toFixed(2) }}</h4>
          </header>
          <div class="content">
            <p>{{ machine.description }}</p>
          </div>
          <footer>
            <!-- <wr-btn primary dark color="primary" big>Aanvragen</wr-btn> -->
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent, reactive } from '@vue/composition-api';
import Button from '../ui-components/Button.vue';

export default createComponent({
  components: {
    'wr-btn': Button,
  },
  props: {
    machine: Object,
  },
  setup(props, ctx) {
    let vendor;
    let model;

    if (props.machine) {
      const machineNames = props.machine.machineName.split(' ');
      [vendor, ...model] = machineNames;
      model = model.join(' ');
    }

    const state = reactive({
      vendor,
      model,
    });

    return {
      state,
      ctx,
    };
  },
});
</script>

<style lang="scss" scoped>
.holder {
  position: relative;
  width: 80%;
  display: flex;
  align-items: center;
  margin: 0 auto 10rem auto;
  .left {
    width: 50%;
    background: $primary-color;
    height: 100%;
    position: absolute;
    bottom: 0;
    top: 0;
    border-radius: $border-radius;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    box-shadow: 0 0 2rem rgba(0, 0, 0, 0.3);
    .desktop {
      height: 80%;
      text {
        font-family: 'Montserrat', sans-serif;
        fill: rgba(255, 255, 255, 0.3);
        transform: rotate(-90deg);
      }
      svg {
        height: 80%;
      }
    }
    .mobile {
      display: none;
    }
  }
  .right {
    background: #0c1f2c;
    margin: 5rem 0 5rem auto;
    width: 70%;
    z-index: 2;
    border-radius: $border-radius;
    color: #fff;
    box-shadow: 0 0 4rem rgba(0, 0, 0, 0.4);
    .info-holder {
      margin-left: -20rem;
      display: flex;
      padding: 5rem 0;
      .image {
        margin: auto 0;
        max-width: 40rem;
        img {
          width: 100%;
          filter: drop-shadow(0 0 2rem rgba(0, 0, 0, 0.2));
        }
      }
      .info {
        width: calc(70% - 20rem);
        display: flex;
        flex-direction: column;
        header {
          h3 {
            font-size: 6rem;
            margin-bottom: 1rem;
            text-transform: uppercase;
          }
          h4 {
            font-size: 4rem;
            font-weight: 400;
          }
          margin-bottom: 2rem;
        }
        .content {
          margin-bottom: 2rem;
          p {
            margin-bottom: 1rem;
            line-height: 1.8;
            font-size: 2rem;
            &:not(:first-of-type) {
              margin-top: 1rem;
            }
          }
          li {
            margin-left: 15px;
            line-height: 1.8;
          }
        }
        footer {
          margin-top: auto;
          margin-bottom: 2rem;
        }
      }
    }
  }
}

@media screen and (max-width: 1024px) {
  .holder {
    .right {
      .info-holder {
        margin-left: -10rem;
        .image {
          max-width: 20rem;
        }
        .info {
          width: calc(70% - 5rem);
          header {
            h3 {
              font-size: 4rem;
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .holder {
    flex-direction: column;
    .left {
      width: 90%;
      background: $primary-color;
      height: inherit;
      position: absolute;
      bottom: auto;
      padding-bottom: 10rem;
      top: 0;
      border-radius: $border-radius;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      box-shadow: 0 0 2rem rgba(0, 0, 0, 0.3);
      .desktop {
        display: none;
      }
      .mobile {
        display: block;
        width: 80%;
        text {
          font-family: 'Montserrat', sans-serif;
          fill: rgba(255, 255, 255, 0.3);
        }
        svg {
          width: 80%;
        }
      }
    }
    .right {
      z-index: 2;
      width: 100%;
      margin: 12rem 0 0 0;
      .info-holder {
        margin: 0;
        .image {
          max-width: 20rem;
        }
        .info {
          width: calc(100% - 20rem);
        }
      }
    }
  }
}

@media screen and (max-width: 600px) {
  .holder {
    .right {
      margin: 7rem 0 0 0;
      .info-holder {
        margin: 0;
        flex-direction: column;
        .image {
          max-width: 20rem;
          align-self: center;
          margin-bottom: 5rem;
        }
        .info {
          width: 100%;
          padding: 0 2rem;
        }
      }
    }
  }
}
</style>

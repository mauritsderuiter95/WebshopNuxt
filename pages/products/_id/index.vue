<template>
  <div class="body">
    <div class="grid">
      <h1>{{ product.productName }}</h1>
      <span />
      <div class="half">
        <div class="featured">
          <img
            :src="product.photo.url"
            :alt="product.photo.alt"
            :title="product.photo.title"
          >
        </div>
      </div>
      <div class="half">
        <p>{{ product.shortDescription }}</p>
        <span class="price">€ {{ Number(product.price).toFixed(2) }}</span>
        <div class="actions">
          <div class="counter">
            <span
              class="editor minus"
              @click="countMinus"
            >
              &minus;
            </span>
            <input
              id="count"
              v-model="count"
              type="text"
              name="count"
              class="count"
            >
            <span
              class="editor plus"
              @click="count++"
            >
              +
            </span>
          </div>
          <wr-btn
            color="primary"
            dark
            block
            big
            @click="addToCart"
          >
            In winkelwagen
          </wr-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductService from "~/services/product.service.js";
import Button from "~/components/ui-components/Button.vue";

export default {
	components: {
		"wr-btn": Button
	},
  data() {
    return {
      count: 1,
    }
  },
	asyncData({ params }) {
		return ProductService.getProduct(params.id).then(response => {
			return {
				product: response.data,
			};
		});
  },
	methods: {
		addToCart() {
			this.$store.dispatch("cart/addToCart", this.product);
    },
    countMinus() {
      if(this.count > 1) {
        this.count--;
      }
    }
	}
};
</script>

<style lang="scss" scoped>
.body {
	margin: 0 auto;
	display: flex;
  max-width: 120rem;
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 2rem;
    width: 100%;
    border-radius: $border-radius;
    background: #fff;
    box-shadow: $box-shadow;
    padding: 10rem 18rem;
    h1 {
      font-size: 5rem;
      margin-bottom: 2rem;
      font-family: 'Magneto', Helvetica;
      color: #7C0000;
    }
    .half {
      display: flex;
      flex-direction: column;
      height: 100%;
      position: relative;
      .price {
        font-size: 4rem;
        color: #7C0000;
        font-weight: 700;
        display: flex;
        margin-left: auto;
        margin-top: auto;
      }
      .actions {
        margin-top: 2rem;
        display: flex;
        .counter {
          position: relative;
          margin-right: 4rem;
          input {
            text-align: center;
            padding: 2rem;
            background: rgba(0,0,0,0.05);
            border: none;
            border-radius: $border-radius;
            font-size: 2rem;
          }
          .count {
            max-width: 15rem;
          }
          .editor {
            position: absolute;
            top: 0;
            padding: 0.5rem 2rem;
            font-size: 4rem;
            font-weight: 200;
            color: rgba(0,0,0,0.2);
            cursor: pointer;
            &:hover {
              color: rgba(0,0,0,0.9);
            }
          }
          .minus {
            left: 0;
          }
          .plus {
            right: 0;
          }
        }
      }
    }
  }
  .featured {
    img {
      width: 100%;
      border-radius: $border-radius;
    }
	}
}

.fade-enter {
	opacity: 0;
}
.fade-enter-active {
	opacity: 1;
	transition: opacity 0.2s;
}
.fade-leave-to {
	opacity: 1;
}
.fade-leave-active {
	opacity: 0;
	transition: opacity 0.2s;
}

@media screen and (max-width: 1024px) {
  .body {
    padding: 3rem;
    .grid {
      grid-row-gap: 4rem;
      padding: 4rem 8rem;
    }
  }
}

@media screen and (max-width: 768px) {
  .body {
    padding: 3rem;
    .grid {
      grid-template-columns: 1fr;
      grid-row-gap: 2rem;
      padding: 2rem;
    }
  }
}

</style>


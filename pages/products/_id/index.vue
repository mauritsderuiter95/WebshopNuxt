<template>
  <div class="body">
    <div class="content">
      <div class="grid">
        <div class="half">
          <div
            v-if="product.photos"
            class="photos"
          >
            <div class="featured">
              <transition
                name="fade"
                mode="out-in"
              >
                <img
                  :key="featuredPhoto.url"
                  :src="featuredPhoto.url"
                  :alt="featuredPhoto.alt"
                  :title="featuredPhoto.title"
                >
              </transition>
            </div>
            <ul class="imageList">
              <li
                v-for="photo in product.photos"
                :key="photo.url"
                @click="bigPicture(photo)"
              >
                <img
                  :src="photo.url"
                  :alt="photo.alt"
                  :title="photo.title"
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="half">
          <h1>{{ product.productName }}</h1>
          <p>{{ product.shortDescription }}</p>
          <div class="actions">
            <wr-btn
              color="primary"
              dark
              block
              big
              @click="addToCart"
            >
              Add to cart
            </wr-btn>
          </div>
          <div class="productInfo">
            <!-- eslint-disable-next-line -->
            <div v-html="product.longDescription" />
          </div>
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
	asyncData({ params }) {
		return ProductService.getProduct(params.id).then(response => {
			return {
				product: response.data,
				featuredPhoto: response.data.photos[0]
			};
		});
	},
	methods: {
		bigPicture(photo) {
			this.featuredPhoto = photo;
		},
		addToCart() {
			this.$store.dispatch("cart/addToCart", this.product);
		}
	}
};
</script>

<style lang="scss" scoped>
.body {
	margin: 0 auto;
	display: flex;
  width: 120rem;
	.content {
		display: flex;
		flex-wrap: wrap;
		.grid {
			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-column-gap: 2rem;
			.half {
				display: flex;
				flex-direction: column;
				padding: 1rem;
			}
		}
	}
	.photos {
		overflow: hidden;
		border-radius: 4px;
		transition: 0.3s;
		box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
		padding: 2rem;
		.featured {
			img {
				width: 100%;
				border-radius: 0.5rem;
			}
		}
		.imageList {
			list-style-type: none;
			display: grid;
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			grid-gap: 1rem;
			margin-top: 1rem;
			padding-left: 0;
			li {
				cursor: pointer;
				img {
					width: 100%;
					border-radius: 0.5rem;
				}
			}
		}
	}
	.productInfo {
		font-size: 1.6rem;
		/deep/ p {
			margin-bottom: 2rem;
		}
		/deep/ ul {
			margin-left: 2rem;
		}
	}
}
> div {
	padding: 2rem;
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
</style>


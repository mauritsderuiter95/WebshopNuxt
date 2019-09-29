<template>
  <div class="content">
    <header>
      <div class="left">
        <img
          src="/home/maurits/www/backend.wrautomaten.nl/build/wwwroot/images/logo.png"
          alt="WR Automaten"
        >
      </div>
      <div class="right">
        <p>WR Automaten</p>
        <p>Dijkgraafstraat 12</p>
        <p>Krimpen aan den IJssel</p>
        <br>
        <p>KVK:</p>
        <p>BTW:</p>
        <p>Bank:</p>
      </div>
    </header>
    <section class="address">
      <p v-if="order.user.company">
        {{ order.user.company }}
      </p>
      <p>{{ order.user.firstName }} {{ order.user.lastName }}</p>
      <p>{{ order.user.street }}</p>
      <p v-if="order.user.street2">
        {{ order.user.street2 }}
      </p>
      <p>{{ order.user.zipcode }} {{ order.user.city }}</p>
    </section>
    <section>
      <table class="products">
        <thead>
          <td bgcolor="#7C0000">
            Omschrijving
          </td>
          <td bgcolor="#7C0000">
            Stuks
          </td>
          <td
            bgcolor="#7C0000"
            class="price"
          >
            Stukprijs
          </td>
          <td
            bgcolor="#7C0000"
            class="price"
          >
            Totaal
          </td>
        </thead>
        <tr
          v-for="product in order.products"
          :key="product.productid"
        >
          <td>{{ product.productName }}</td>
          <td>{{ product.count }}</td>
          <td class="price">
            €{{ Number(product.productPrice).toFixed(2) }}
          </td>
          <td class="price">
            €{{ (Number(product.productPrice) * Number(product.count)).toFixed(2) }}
          </td>
        </tr>
        <tr>
          <td />
          <td />
          <td class="summary">
            Subtotaal:
          </td>
          <td class="price summary">
            €{{ Number(getSubtotal).toFixed(2) }}
          </td>
        </tr>
        <tr>
          <td />
          <td />
          <td>Verzendkosten:</td>
          <td class="price">
            €{{ Number(order.sendingCosts).toFixed(2) }}
          </td>
        </tr>
        <tr>
          <td />
          <td />
          <td>BTW:</td>
          <td class="price">
            €{{ Number(getBtw).toFixed(2) }}
          </td>
        </tr>
        <tr>
          <td />
          <td />
          <td class="summary">
            Totaal:
          </td>
          <td class="price summary">
            €{{ Number(getTotal).toFixed(2) }}
          </td>
        </tr>
      </table>
    </section>
    <footer>
      Indien u dit nog niet betaald heeft, kunt u het totaalbedrag overmaken naar het rekeningnummer [...] onder vermelding van het factuurnummer.
    </footer>
  </div>
</template>

<script>
export default {
    computed: {
      getSubtotal() {
        let prices = this.order.products.map(product => {
          return product.productPrice * product.count;
        })

        return prices.reduce((acc, price) => acc + price, 0);
      },
      getBtw() {
        return (this.getSubtotal + this.order.sendingCosts) * 0.09;
      },
      getTotal() {
        return this.getSubtotal + this.order.sendingCosts + this.getBtw;
      },
    },
    asyncData({ $axios, params, query }) {
      let url = `${ $axios.defaults.baseURL }/orders/${params.id}`;
      if (query.key)
        url = `${url}?key=${query.key}`;
      return $axios.$get(url)
        .then(res => {
          return { order: res }
        })
        .catch(e => {
          console.log(e)
        })
    },
    layout: 'empty'
}
</script>

<style lang="scss" scoped>
@media print {
  .content {
    font-weight: 600;
    header {
      width: 100%;
      .left {
        width: 70%;
        float:left;
        img {
          width: 400px;
        }
      }
      .right {
        width: 30%;
        float: left;
        p {
          width: 100%;
        }
      }
    }
    section {
      margin: 2rem 0;
      .products {
        width: 100%;
        border-collapse: collapse;
        thead {
          width: 100%;
          //background: #7C0000;
          color: #fff;
          td {
            &:first-of-type {
              width: 60%;
            }
          }
        }
        .price {
          text-align: right;
        }
        td {
          padding: 1rem;
        }
        .summary {
          border-top: 1px solid #000;
        }
      }
    }
    footer {
      text-align: center;
    }
  }
}
</style>

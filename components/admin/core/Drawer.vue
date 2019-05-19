<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="inputValue"
    app
    dark
    floating
    persistent
    mobile-break-point="991"
    width="260"
  >
    <v-img
      :src="image"
      :gradient="sidebarOverlayGradiant"
      height="100%"
    >
      <v-layout
        class="fill-height"

        column
      >
        <v-list-tile avatar>
          <v-list-tile-avatar
            color="white"
          >
            WR
          </v-list-tile-avatar>
          <v-list-tile-title class="title">
            Vuetify MD
          </v-list-tile-title>
        </v-list-tile>
        <v-divider />
        <v-list-tile
          v-if="responsive"
        >
          <v-text-field
            class="purple-input search-input"
            label="Search..."
            color="purple"
          />
        </v-list-tile>
        <v-list-tile
          v-for="(link, i) in links"
          :key="i"
          :to="link.to"
          :active-class="color"
          avatar
          class="v-list-item"
        >
          <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title
            v-text="link.text"
          />
        </v-list-tile>
      </v-layout>
    </v-img>
  </v-navigation-drawer>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  components: {
  },
  data: () => ({
    logo: './img/vuetifylogo.png',
    links: [
      {
        to: '/admin/dashboard',
        icon: 'mdi-view-dashboard',
        text: 'Dashboard'
      },
      {
        to: '/admin/products',
        icon: 'mdi-store',
        text: 'Producten'
      },
      {
        to: '/admin/orders',
        icon: 'mdi-clipboard-outline',
        text: 'Bestellingen'
      },
      {
        to: '/admin/invoices',
        icon: 'mdi-receipt',
        text: 'Facturen'
      },
      {
        to: '/admin/questions',
        icon: 'mdi-comment-question',
        text: 'Vragen'
      },
      {
        to: '/admin/users',
        icon: 'mdi-account',
        text: 'Klanten'
      }
    ],
    responsive: false,
  }),
  computed: {
    ...mapState('visual', ['image', 'color', 'sidebarBackgroundColor', 'drawer' ]),
    inputValue: {
      get () {
        return this.drawer;
      },
      set (val) {
        this.setDrawer(val);
      }
    },
    sidebarOverlayGradiant () {
      return `${this.sidebarBackgroundColor}, ${this.sidebarBackgroundColor}`;
    }
  },
  mounted () {
    this.onResponsiveInverted();
    window.addEventListener('resize', this.onResponsiveInverted);
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResponsiveInverted);
  },
  methods: {
    ...mapMutations('visual',['setDrawer','toggleDrawer']),
    onResponsiveInverted () {
      if (window.innerWidth < 991) {
        this.responsive = true
      } else {
        this.responsive = false
      }
    }
  }
}
</script>


<style lang="scss" scoped>
@import '~/assets/scss/index.scss';
  #app-drawer {
    box-shadow: 0 10px 30px -12px rgba(0,0,0,.42), 0 4px 25px 0 rgba(0,0,0,.12), 0 8px 10px -5px rgba(0,0,0,.2);
    color: #fff;
    .v-list__tile {
      border-radius: 4px;
    }

    .v-divider {
      border-color: hsla(0,0%,70.6%,.3);
      margin: -1px auto 24px;
      width: calc(100% - 30px);
    }

    .v-image__image--contain {
      top: 9px;
      height: 60%;
    }

    .search-input {
      margin-bottom: 30px !important;
      padding-left: 15px;
      padding-right: 15px;
    }

    div.v-responsive.v-image > div.v-responsive__content {
      overflow-y: auto;
    }

    .v-list-item {
      margin: 10px 15px 0;
    }
  }
</style>


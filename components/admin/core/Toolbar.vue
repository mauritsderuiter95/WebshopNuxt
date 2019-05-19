<template>
  <v-toolbar
    id="core-toolbar"

    flat
    prominent
    style="background: #eee;"
  >
    <div class="v-toolbar-title">
      <v-toolbar-title
        class="tertiary--text font-weight-light"
      >
        <v-btn
          v-if="responsive"
          class="default v-btn--simple"
          dark
          icon
          @click.stop="onClickBtn"
        >
          <v-icon>mdi-view-list</v-icon>
        </v-btn>
        {{ title }}
      </v-toolbar-title>
    </div>

    <v-spacer />
    <v-toolbar-items>
      <v-flex
        align-center
        layout
        py-2
      >
        <router-link
          v-ripple
          class="toolbar-items"
          to="/admin"
        >
          <v-icon color="tertiary">
            mdi-view-dashboard
          </v-icon>
        </router-link>
        <v-menu
          bottom
          left
          content-class="dropdown-menu"
          offset-y
          transition="slide-y-transition"
        >
          <nuxt-link
            slot="activator"
            v-ripple
            class="toolbar-items"
            to="/notifications"
          >
            <v-badge
              color="error"
              overlap
            >
              <template slot="badge">
                {{ notifications.length }}
              </template>
              <v-icon color="tertiary">
                mdi-bell
              </v-icon>
            </v-badge>
          </nuxt-link>
          <v-card>
            <v-list dense>
              <v-list-tile
                v-for="notification in notifications"
                :key="notification"
                @click="onClick"
              >
                <v-list-tile-title
                  v-text="notification"
                />
              </v-list-tile>
            </v-list>
          </v-card>
        </v-menu>
        <a
          v-ripple
          class="toolbar-items"
          @click="logOut"
        >
          <v-icon color="tertiary">
            mdi-logout
          </v-icon>
        </a>
      </v-flex>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>

import {
  mapMutations, mapState
} from 'vuex'

export default {
  data: () => ({
    notifications: [
      'Mike, John responded to your email',
      'You have 5 new tasks',
      'You\'re now a friend with Andrew',
      'Another Notification',
      'Another One'
    ],
    title: null,
    responsive: false,
    responsiveInput: false
  }),
  computed: {
    ...mapState('visual', ['drawer'])
  },

  watch: {
    '$route' (val) {
      this.title = val.name
    }
  },

  mounted () {
    this.onResponsiveInverted()
    window.addEventListener('resize', this.onResponsiveInverted)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResponsiveInverted)
  },

  methods: {
    ...mapMutations('visual', ['setDrawer', 'toggleDrawer']),
    onClickBtn () {
      this.setDrawer(!this.drawer)
    },
    onClick () {
      //
    },
    onResponsiveInverted () {
      if (window.innerWidth < 991) {
        this.responsive = true
        this.responsiveInput = false
      } else {
        this.responsive = false
        this.responsiveInput = true
      }
    },
    logOut() {
      this.$store.dispatch("user/logout");
      window.location = '/admin';
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/index.scss';
#core-toolbar {
  a {
    text-decoration: none;
  }
  .tertiary--text {
    i {
      color: #999!important;
    }
  }
}
</style>

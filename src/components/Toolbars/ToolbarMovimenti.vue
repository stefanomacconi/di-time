<template>
  <div>
    <v-toolbar color='primary' dark scroll-off-screen app clipped-right>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        DiTime - Movimenti
        <v-divider light vertical></v-divider>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn icon v-if="this.$store.getters.getMovimentiSelezionati.length > 1">
          <v-icon>link</v-icon>
        </v-btn>
        <!--<v-divider dark vertical></v-divider>-->
        <v-btn icon @click="dateMenu = true">
          <v-icon>event</v-icon>
        </v-btn>
        <!--<v-divider dark vertical></v-divider>-->
        <v-btn icon>
          <v-icon>search</v-icon>
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-divider dark vertical></v-divider>
        <v-btn @click="logout" flat>
          <v-icon left>{{ menuLogout.icon }}</v-icon>
          {{ menuLogout.title }}
        </v-btn>
      </v-toolbar-items>
      <!-- <v-menu right bottom origin="bottom right" transition="v-scale-transition">
        <v-btn dark icon slot="activator">
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list dense class="pt-0">
          <v-list-tile v-for="menu in menus" :key="menu.title" :to="menu.to">
            <v-list-tile-action>
              <v-icon>{{ menu.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ menu.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu> -->
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" temporary app>
      <v-toolbar flat>
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="title">
            {{ utente + " - Ditta: " + siglaDitta }}
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
      </v-toolbar>
      <v-divider></v-divider>
      <!-- Menu Link -->
      <v-list dense class="pt-0">
        <v-list-tile  v-for="menu in menusLink" :key="menu.title" :to="menu.to">
          <v-list-tile-action>
            <v-icon>{{ menu.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ menu.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <!-- Menu Fun -->
        <v-list-tile  @click="searchMov">
          <v-list-tile-action>
            <v-icon>search</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Cerca Movimento</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile  @click="more">
          <v-list-tile-action>
            <v-icon>get_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Scarica più Movimenti</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider dark></v-divider>
        <v-list-tile @click="logout">
          <v-list-tile-action>
            <v-icon>{{ menuLogout.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ menuLogout.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <!-- Date Menu -->
    <v-menu ref="dateMenu" :close-on-content-click="false" v-model="dateMenu" :nudge-right="40"
      :return-value.sync="date" lazy transition="scale-transition" offset-y full-width
      max-width="290px" min-width="290px">
      <v-date-picker :event-color="functionEventsColor" :events="functionEvents" v-model="date" 
        :allowed-dates="allowedDates" no-title show-current locale="it-IT">
        <v-spacer></v-spacer>
        <!-- <v-btn flat color="secondary" @click="dateMenu = false">Chiudi</v-btn> -->
        <v-btn flat color="primary" @click="$refs.dateMenu.save(date); scrollTop()">OK</v-btn>
      </v-date-picker>
    </v-menu>
    <!-- ATTENDERE DIALOG -->
    <div class="text-xs-center">
      <v-dialog v-model="attendereDialog" persistent width="300" >
        <v-card color="primary" dark>
          <v-card-text>
            Attendere...
            <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>

import moment from 'moment'

export default {
  data: () => ({
    dateMenu: false,
    drawer: false,
    menusLink: [
      {title: "Nuovo Movimento", to: "/movimento", icon: "add"},
    ],
    menuLogout : {title: "Logout", icon: "lock"},
    attendereDialog : false
  }),
  computed: {
    utente () {
      return this.$store.getters.getUtente
    },
    siglaDitta () {
      return this.$store.getters.getSiglaDitta
    },
    date: {
      get () {
        var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        return new Date(this.$store.getters.getPickedData - tzoffset).toISOString().substr(0, 10)
      },
      set (value) {
        this.$store.dispatch('setPickedData', moment(value).valueOf())
      }
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    },
    functionEvents(date) {
      const warningDate = this.$store.getters.getGiorniWarning
      const errorDate = this.$store.getters.getGiorniError
      const ms = moment(date).valueOf()
      if (warningDate.includes(ms) || errorDate.includes(ms))
        return ms
    },
    functionEventsColor(date) {
      const warningDate = this.$store.getters.getGiorniWarning
      const errorDate = this.$store.getters.getGiorniError
      const ms = moment(date).valueOf()
      if (warningDate.includes(ms))
        return "yellow" 
      if (errorDate.includes(ms))
        return "red"
    },
    allowedDates: val => val <= new Date().toISOString().substr(0, 10),
    searchMov() {
      this.drawer = false
      console.log("searchMov")
    },
    scrollTop() {
      window.scrollTo(0,0)
    },
    more() {
      this.drawer = false
      this.attendereDialog = true
      this.$store.dispatch('incrementOffset')
      this.$store.dispatch('fetchMovimenti', this.$store.getters.getOffset).then(() => {
        this.attendereDialog = false
      })
    },
  }
}
</script>
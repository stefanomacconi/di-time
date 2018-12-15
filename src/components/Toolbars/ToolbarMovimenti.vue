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
        <v-btn icon>
          <v-icon>link</v-icon> <!-- TODO a comparsa v-if selected > 1 -->
        </v-btn>
        <v-divider dark vertical></v-divider>
        <v-btn icon @click="dateMenu = true">
          <v-icon>event</v-icon>
        </v-btn>
        <v-divider dark vertical></v-divider>
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
      <v-list dense class="pt-0">
        <v-list-tile v-for="menu in menus" :key="menu.title" :to="menu.to">
          <v-list-tile-action>
            <v-icon>{{ menu.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ menu.title }}</v-list-tile-title>
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
        <v-date-picker :event-color="date => date[9] % 2 ? 'red' : 'yellow'" v-model="date" 
          :events="functionEvents" :allowed-dates="allowedDates" no-title show-current locale="it-IT">
          <v-spacer></v-spacer>
          <v-btn flat color="secondary" @click="dateMenu = false">Chiudi</v-btn>
          <v-btn flat color="primary" @click="dateMenu = false">OK</v-btn>
        </v-date-picker>
      </v-menu>
  </div>
</template>

<script>
export default {
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    dateMenu: false,
    drawer: false,
    menus: [
      {title: "Nuovo Movimento", to: "/movimento", icon: "note_add"}
    ],
    menuLogout : {title: "Logout", icon: "lock"},
  }),
  computed: {
    utente () {
      return this.$store.getters.getUtente
    },
    siglaDitta () {
      return this.$store.getters.getSiglaDitta
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    },
    functionEvents (date) {
      const [,, day] = date.split('-')
      return parseInt(day, 10) % 3 === 0
    },
    allowedDates: val => val <= new Date().toISOString().substr(0, 10),
  }
}
</script>
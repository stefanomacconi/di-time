<template>
  <div>
    <v-toolbar color='primary' dark fixed app clipped-right>
      <v-icon dark @click="goBack">arrow_back</v-icon>
      &nbsp;&nbsp;&nbsp;
      <v-toolbar-title v-if="this.isNewMov">
        Nuovo Movimento
      </v-toolbar-title>
      <v-toolbar-title v-else>
        Movimento {{ id }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
        <!-- TODO passarli con props -->
        <v-toolbar-items v-if="this.isNewMov">
          <v-btn icon color="green lighten-2" @click="saveMov">
            <v-icon>check</v-icon>
          </v-btn>
        </v-toolbar-items>
        <v-toolbar-items v-else>
          <v-btn icon>
            <v-icon>print</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>attach_file</v-icon>
          </v-btn>
          <v-divider dark vertical></v-divider>
          <v-btn icon @click="saveMov">
            <v-icon color="green lighten-2">check_circle</v-icon>
          </v-btn>
          <v-divider dark vertical></v-divider>
          <v-btn icon>
            <v-icon color="red lighten-2">delete_forever</v-icon>
          </v-btn>
        </v-toolbar-items>
        <v-tabs slot="extension" v-model="tab" fixed-tabs color="transparent">
          <v-tabs-slider></v-tabs-slider>
          <v-tab v-for="item in tabItems" :key="item.index" @click="selectTab(item.index)" class="primary--text">
            <v-icon>{{item.icon}}</v-icon>
          </v-tab>
        </v-tabs>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  created() {
    // set current tab to the first one
    this.$store.dispatch('setTab', 0)
    // set in store if is a new mov or not
    if (this.$route.params.id) {
      // edit
      this.$store.dispatch('setIsNewMov', false)
      this.isNewMov = false
    }
    else {
      // new
      this.$store.dispatch('setIsNewMov', true) 
      this.isNewMov = true
      this.$store.dispatch('clearMov') 
    }
  },
  data() {
    return {
      tab : 0,
      tabItems : [
        {index: 0, icon: "work", desr: "Descrizione"},
        {index: 1, icon: "receipt", descr: "Nota Spese"},
        {index: 2, icon: "shopping_cart", descr: "Lista Articoli"}
      ],
      isNewMov : false
    }
  },
  props: {
    id: {
      default: ""
    }
  },
  methods: {
    goBack() {
      window.history.back()
    },
    selectTab(index) {
      this.$store.dispatch('setTab', index)
    },
    saveMov() {
      // check obligatory fields
      if (!this.$store.getters.getCommessa || !this.$store.getters.getTempo)
        return
      // save movement
      // TODO fare post che salva il movimento, 
      // non ha senso recuperare le info perché dovrebbero essere già nel movimento.js
    }
  }
}
</script>
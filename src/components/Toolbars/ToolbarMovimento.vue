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

import moment from 'moment'

import axios from "axios"

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
      if (!this.$store.getters.getCommessa || !this.$store.getters.getTempo) {
        // TODO mettere qui un qualcosa che faccia comparire rossi i campi non immessi
        return
      }
      // save movement
      const date = moment(this.$store.getters.getData, "YYYY-MM-DD").valueOf()
      const oraInizioMattino = this.$store.getters.getTimeG1 ? this.$store.getters.getTimeG1.replace(":", "") : this.$store.getters.getTimeG1
      const oraFineMattino = this.$store.getters.getTimeG2 ? this.$store.getters.getTimeG2.replace(":", "") : this.$store.getters.getTimeG2
      const oraInizioPomeriggio = this.$store.getters.getTimeG3 ? this.$store.getters.getTimeG3.replace(":", "") : this.$store.getters.getTimeG3
      const oraFinePomeriggio = this.$store.getters.getTimeG4 ? this.$store.getters.getTimeG4.replace(":", "") : this.$store.getters.getTimeG4
      const oraInizioAttMattino = this.$store.getters.getTimeA1 ? this.$store.getters.getTimeA1.replace(":", "") : this.$store.getters.getTimeA1
      const oraFineAttMattino = this.$store.getters.getTimeA2 ? this.$store.getters.getTimeA2.replace(":", "") : this.$store.getters.getTimeA2
      const oraInizioAttPomeriggio = this.$store.getters.getTimeA3 ? this.$store.getters.getTimeA3.replace(":", "") : this.$store.getters.getTimeA3
      const oraFineAttPomeriggio = this.$store.getters.getTimeA4 ? this.$store.getters.getTimeA4.replace(":", "") : this.$store.getters.getTimeA4
      axios.post('/movimento/lavorazione/'  + this.$store.getters.getDipendente, 
        {
            commessa: this.$store.getters.getCommessa,
            descrizione: this.$store.getters.getNota,
            // TODO gestire solo il codice della causale, idem per cdl e cdc
            causale: this.$store.getters.getCausale,
            cdl: this.$store.getters.getCdl,
            cdc: this.$store.getters.getCdc,
            data: date,
            posizione: this.$store.getters.getPosizione,
            tempo: this.$store.getters.getTempo,
            oraInizioMattino: oraInizioMattino,
            oraFineMattino: oraFineMattino,
            oraInizioPomeriggio: oraInizioPomeriggio,
            oraFinePomeriggio: oraFinePomeriggio,
            oraInizioAttMattino: oraInizioAttMattino,
            oraFineAttMattino: oraFineAttMattino,
            oraInizioAttPomeriggio: oraInizioAttPomeriggio,
            oraFineAttPomeriggio: oraFineAttPomeriggio
        }).then(res => {
          // eslint-disable-next-line
          console.log(res)
        }).catch(error => {
          // eslint-disable-next-line
          console.log(error)
          this.$store.dispatch('handleError', error.response.data)
        })
    }
  }
}
</script>
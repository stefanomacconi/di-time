<template>
  <div>
    <v-form v-model="valid">
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex xs6 md6 lg6>
            <!-- *** DATA, COMMESSA e NOTA *** -->
            <v-menu ref="menuDate" :close-on-content-click="true" v-model="menuDate" :nudge-right="40" 
              lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
              <v-text-field slot="activator" v-model="computedDateFormatted" label="Data Movimento" 
                prepend-icon="event" @blur="date = parseDate(computedDateFormatted)" required>
              </v-text-field>
              <v-date-picker v-model="date" :allowed-dates="allowedDates" no-title locale="it-IT"
                :readonly="this.$store.getters.isNewMov ? false : true">
              </v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex xs6 md6 lg6>
            <v-text-field v-model="commessa" :rules="commessaRules" :counter="8" 
              label="Commessa" append-icon="search" @click:append="showDialogCommessa()" required 
              :readonly="this.$store.getters.isNewMov ? false : true">
            </v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-textarea rows="3" v-model="nota" prepend-icon="notes" label="Nota" :rules="this.notaRules" required>
            </v-textarea>
          </v-flex>
          <!-- *** ATTIVITA' *** -->
          <v-flex xs12>
            <v-subheader class="subtitle">Attività</v-subheader>
          </v-flex>  
          <v-flex xs3 md3 lg3>
            <v-menu ref="menuTimeA1" :close-on-content-click="false" v-model="menuTimeA1" :nudge-right="40"
              :return-value.sync="timeA1" lazy transition="scale-transition" offset-y full-width
              max-width="290px" min-width="290px">
              <v-text-field slot="activator" v-model="timeA1" label="Inizio" prepend-icon="alarm_on" readonly>
              </v-text-field>
              <v-time-picker no-title format="24hr" :allowed-minutes="allowedStep" v-if="menuTimeA1" v-model="timeA1" 
                full-width @change="$refs.menuTimeA1.save(timeA1)">
              </v-time-picker>
            </v-menu>
          </v-flex>
          <v-flex xs2 md2 lg2>
            <v-menu ref="menuTimeA2" :close-on-content-click="false" v-model="menuTimeA2" :nudge-right="40"
              :return-value.sync="timeA2" lazy transition="scale-transition" offset-y full-width
              max-width="290px" min-width="290px">
              <v-text-field slot="activator" v-model="timeA2" label="Fine" readonly>
              </v-text-field>
              <v-time-picker no-title format="24hr" :allowed-minutes="allowedStep" v-if="menuTimeA2" v-model="timeA2" 
                full-width @change="$refs.menuTimeA2.save(timeA2)">
              </v-time-picker>
            </v-menu>
          </v-flex>
          <v-flex xs3 md3 lg3>
            <v-menu ref="menuTimeA3" :close-on-content-click="false" v-model="menuTimeA3" :nudge-right="40"
              :return-value.sync="timeA3" lazy transition="scale-transition" offset-y full-width
              max-width="290px" min-width="290px">
              <v-text-field slot="activator" v-model="timeA3" label="Inizio" prepend-icon="work_outline" readonly>
              </v-text-field>
              <v-time-picker no-title format="24hr" :allowed-minutes="allowedStep" v-if="menuTimeA3" v-model="timeA3" 
                full-width @change="$refs.menuTimeA3.save(timeA3)">
              </v-time-picker>
            </v-menu>
          </v-flex>
          <v-flex xs2 md2 lg2>
            <v-menu ref="menuTimeA4" :close-on-content-click="false" v-model="menuTimeA4" :nudge-right="40"
              :return-value.sync="timeA4" lazy transition="scale-transition" offset-y full-width
              max-width="290px" min-width="290px">
              <v-text-field slot="activator" v-model="timeA4" label="Fine" readonly>
              </v-text-field>
              <v-time-picker no-title format="24hr" :allowed-minutes="allowedStep" v-if="menuTimeA4" v-model="timeA4" 
                full-width @change="$refs.menuTimeA4.save(timeA4)">
              </v-time-picker>
            </v-menu>
          </v-flex>
          <v-flex xs2 md2 lg2>
            <v-text-field :value="totTimeA" :rules="tempoRules" label="Tot" hint="Tempo" persistent-hint single-line readonly required>
            </v-text-field>
          </v-flex>
          <!-- *** GIORNATA *** -->
          <v-flex xs12>
            <v-subheader class="subtitle">Giornata</v-subheader>
          </v-flex>  
          <v-flex xs3 md3 lg3>
            <v-menu ref="menuTimeG1" :close-on-content-click="false" v-model="menuTimeG1" :nudge-right="40"
              :return-value.sync="timeG1" lazy transition="scale-transition" offset-y full-width
              max-width="290px" min-width="290px">
              <v-text-field slot="activator" v-model="timeG1" label="Inizio" prepend-icon="wb_sunny" readonly>
              </v-text-field>
              <v-time-picker no-title format="24hr" :allowed-minutes="allowedStep" v-if="menuTimeG1" v-model="timeG1" 
                full-width @change="$refs.menuTimeG1.save(timeG1)">
              </v-time-picker>
            </v-menu>
          </v-flex>
          <v-flex xs2 md2 lg2>
            <v-menu ref="menuTimeG2" :close-on-content-click="false" v-model="menuTimeG2" :nudge-right="40"
              :return-value.sync="timeG2" lazy transition="scale-transition" offset-y full-width
              max-width="290px" min-width="290px">
              <v-text-field slot="activator" v-model="timeG2" label="Fine" readonly>
              </v-text-field>
              <v-time-picker no-title format="24hr" :allowed-minutes="allowedStep" v-if="menuTimeG2" v-model="timeG2" 
                full-width @change="$refs.menuTimeG2.save(timeG2)">
              </v-time-picker>
            </v-menu>
          </v-flex>
          <v-flex xs3 md3 lg3>
            <v-menu ref="menuTimeG3" :close-on-content-click="false" v-model="menuTimeG3" :nudge-right="40"
              :return-value.sync="timeG3" lazy transition="scale-transition" offset-y full-width
              max-width="290px" min-width="290px">
              <v-text-field slot="activator" v-model="timeG3" label="Inizio" prepend-icon="wb_cloudy" readonly>
              </v-text-field>
              <v-time-picker no-title format="24hr" :allowed-minutes="allowedStep" v-if="menuTimeG3" v-model="timeG3" 
                full-width @change="$refs.menuTimeG3.save(timeG3)">
              </v-time-picker>
            </v-menu>
          </v-flex>
          <v-flex xs2 md2 lg2>
            <v-menu ref="menuTimeG4" :close-on-content-click="false" v-model="menuTimeG4" :nudge-right="40"
              :return-value.sync="timeG4" lazy transition="scale-transition" offset-y full-width
              max-width="290px" min-width="290px">
              <v-text-field slot="activator" v-model="timeG4" label="Fine" readonly>
              </v-text-field>
              <v-time-picker no-title format="24hr" :allowed-minutes="allowedStep" v-if="menuTimeG4" v-model="timeG4" 
                full-width @change="$refs.menuTimeG4.save(timeG4)">
              </v-time-picker>
            </v-menu>
          </v-flex>
          <v-flex xs2 md2 lg2>
            <v-text-field :value="totTimeG" label="Tot" single-line readonly></v-text-field>
          </v-flex>
          <!-- *** DETTAGLIO *** -->
          <v-flex xs12>
            <v-subheader class="subtitle">Dettaglio</v-subheader>
          </v-flex>  
          <v-flex xs6 md4 lg3>
            <v-text-field v-model="posizione" :rules="this.posizioneRules" label="Posizione"
              :readonly="this.$store.getters.isNewMov ? false : true"></v-text-field>
          </v-flex>
          <v-flex xs6 md4 lg3>
            <v-select :items="causali" v-model="causale" label="Causale" 
              :readonly="this.$store.getters.isNewMov ? false : true"></v-select>
          </v-flex>
          <v-flex xs6 md4 lg3>
            <v-select :items="elencoCdl" v-model="cdl" label="CdL" 
              :readonly="this.$store.getters.isNewMov ? false : true"></v-select>
          </v-flex>
          <v-flex xs6 md4 lg3>
            <v-select :items="elencoCdc" v-model="cdc" label="CdC"
              :readonly="this.$store.getters.isNewMov ? false : true"></v-select>
          </v-flex>
        </v-layout>  
      </v-container>
    </v-form>
    <!-- COMMESSA FILTER DIALOG --> 
      <v-layout row justify-center>
      <v-dialog v-model="commessaFilterDialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Ricerca Commessa</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="codicePerCommessa" label="Codice" hint="Codice Commessa">
                  </v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="descrizionePerCommessa" label="Descrizione" hint="Descrizione Commessa">
                  </v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="RagioneSocialePerCommessa" label="Ragione Sociale" hint="Ragione Sociale del Cliente">
                  </v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-select v-model="statoPerCommessa" :items="['Aperte', 'Bloccate', 'Chiuse']" label="Stato">
                  </v-select>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary" flat @click="commessaFilterDialog = false">Chiudi</v-btn>
            <v-btn color="primary" flat @click="searchCommessa">Cerca</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    <!-- LISTA RICERCA COMMESSE DIALOG -->
    <v-layout row justify-center>
    <v-dialog v-model="listaCommesseDialog" scrollable max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Seleziona la Commessa</span>
        </v-card-title>
          <div v-if="listaCommesseCercate.length > 29">
            <font color="red">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Risultato incompleto</font>
          </div>
          <div v-if="listaCommesseCercate.length == 0">
            <font color="red">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nessuna commessa trovata</font>
          </div>
        <v-divider></v-divider>
        <v-card-text style="height: 600px;">
          <v-list two-line>
            <template v-for="(commessa, index) in listaCommesseCercate">
              <v-list-tile :key="commessa.codice" avatar ripple @click="chooseCommessa(commessa.codice)">
                <v-list-tile-content>
                  <v-list-tile-title>
                    <b>{{ commessa.codice }}</b>
                  </v-list-tile-title>
                  <v-list-tile-sub-title class="text--primary">{{ commessa.ragioneSociale }}</v-list-tile-sub-title>
                  <v-list-tile-sub-title>{{ commessa.descrizione }}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-list-tile-action-text>
                    &nbsp;&nbsp;
                    {{ moment(commessa.data).locale('it').format('DD/MM/YYYY').toUpperCase() }}
                  </v-list-tile-action-text>
                  <v-icon>
                    keyboard_return
                  </v-icon>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider v-if="index + 1 < listaCommesseCercate.length" :key="index"></v-divider>
            </template>
          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
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

import axios from 'axios'

import utilities from "../../utilitiesMixin.js"

const campoObbligatorio = "Campo obbligatorio"

export default {
  mounted() {
    if (this.$store.getters.isNewMov)
      return
    this.attendereDialog = true
    var pre = '/movimento/lavorazione/singolo/'
    if (!this.definitivo)
      pre = pre + 'parcheggio/'
    const path = pre + this.$store.getters.getDipendente + "/"
      + this.$route.params.id
    axios.get(path)
      .then(res => {
          // eslint-disable-next-line
          console.log(res)
          // fix causale description
          if (res.data && res.data.causale) {
            const causali = this.$store.getters.getCausali
            causali.forEach(causale => {
              if (res.data.causale == causale.codice)
                res.data.causale = res.data.causale + " - " + causale.descrizione
            })
          } 
          this.$store.commit('setMovimento', res.data)
          this.attendereDialog = false
      }).catch(error => {
          // eslint-disable-next-line
          console.log(error)
          this.$store.dispatch('handleError', error.response.data)
      })
  },
  props: {
    definitivo: {
      default: false
    }
  },
  data: () => ({
    valid: false,
    commessaRules: [
      v => !!v || campoObbligatorio,
      v => v.length <= 8 || "commessa dev'essere < 8 caratteri"
    ],
    tempoRules: [
      v => !!v || "Tempo"
    ],
    notaRules: [
      v => !!v || campoObbligatorio
    ],
    posizioneRules: [
      v => !isNaN(v) || 'posizione deve contenere numeri'
    ],
    commessaFilterDialog: false,
    codicePerCommessa: "",
    descrizionePerCommessa: "",
    RagioneSocialePerCommessa: "",
    statoPerCommessa: "Aperte",
    attendereDialog: false,
    listaCommesseCercate: [],
    listaCommesseDialog: false,
    menuDate: false,
    menuTimeG1: false,
    menuTimeG2: false,
    menuTimeG3: false,
    menuTimeG4: false,
    menuTimeA1: false,
    menuTimeA2: false,
    menuTimeA3: false,
    menuTimeA4: false,
  }),
  computed: {
    computedDateFormatted () {
      return this.formatDate(this.date)
    },
    totTimeG() {
      return this.calcTotTime(true)
    },
    totTimeA() {
      // if (!this.$store.getters.getTimeA1 && this.$store.getters.getTempo)
      //  return this.$store.getters.getTempo
      const value = this.calcTotTime(false)
      this.$store.commit('setTempo', value)
      return value 
    },
    timeA1: {
      get () {
        return this.$store.getters.getTimeA1
      },
      set (value) {
        this.$store.commit('setTimeA1', value)
      }
    },
    timeA2: {
      get () {
        return this.$store.getters.getTimeA2
      },
      set (value) {
        this.$store.commit('setTimeA2', value)
      }
    },
    timeA3: {
      get () {
        return this.$store.getters.getTimeA3
      },
      set (value) {
        this.$store.commit('setTimeA3', value)
      }
    },
    timeA4: {
      get () {
        return this.$store.getters.getTimeA4
      },
      set (value) {
        this.$store.commit('setTimeA4', value)
      }
    },
    timeG1: {
      get () {
        return this.$store.getters.getTimeG1
      },
      set (value) {
        this.$store.commit('setTimeG1', value)
      }
    },
    timeG2: {
      get () {
        return this.$store.getters.getTimeG2
      },
      set (value) {
        this.$store.commit('setTimeG2', value)
      }
    },
    timeG3: {
      get () {
        return this.$store.getters.getTimeG3
      },
      set (value) {
        this.$store.commit('setTimeG3', value)
      }
    },
    timeG4: {
      get () {
        return this.$store.getters.getTimeG4
      },
      set (value) {
        this.$store.commit('setTimeG4', value)
      }
    },
    commessa: {
      get () {
        return this.$store.getters.getCommessa
      },
      set (value) {
        this.$store.commit('setCommessa', value)
      }
    },
    date: {
      get () {
        return this.$store.getters.getData
      },
      set (value) {
        this.$store.commit('setData', value)
      }
    },
    nota: {
      get () {
        return this.$store.getters.getNota
      },
      set (value) {
        this.$store.commit('setNota', value)
      }
    },
    causale: {
      get () {
        return this.$store.getters.getCausale
      },
      set (value) {
        this.$store.commit('setCausale', value)
      }
    },
    cdl: {
      get () {
        return this.$store.getters.getCdl
      },
      set (value) {
        this.$store.commit('setCdl', value)
      }
    },
    cdc: {
      get () {
        return this.$store.getters.getCdc
      },
      set (value) {
        this.$store.commit('setCdc', value)
      }
    },
    causali() {
      const causali = this.$store.getters.getCausali
      var elencoCausali = [""]
      causali.forEach(causale => {
        elencoCausali.push(causale.codice + " - " + causale.descrizione)
      })
      return elencoCausali
    },
    elencoCdl() {
      const cdl = this.$store.getters.getElencoCdl
      var elencoCdl = [""]
      cdl.forEach(centro => {
        elencoCdl.push(centro.codice + " - " + centro.descrizione)
      })
      return elencoCdl
    },
    elencoCdc() {
      const cdc = this.$store.getters.getElencoCdc
      var elencoCdc = [""]
      cdc.forEach(centro => {
        elencoCdc.push(centro.codice + " - " + centro.descrizione)
      })
      return elencoCdc
    },
    posizione: {
      get () {
        return this.$store.getters.getPosizione
      },
      set (value) {
        this.$store.commit('setPosizione', value)
      }
    },
  },
  mixins: [utilities],
  methods: {
    formatDate(date) {
      if (!date) 
        return null
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    parseDate(date) {
      if (!date) 
        return null
      const [month, day, year] = date.split('/')
      return `${year}-${day.padStart(2, '0')}-${month.padStart(2, '0')}`
    },
    allowedDates: val => val <= new Date().toISOString().substr(0, 10),
    allowedStep: m => m % 5 === 0,
    showDialogCommessa() {
      if (!this.$store.getters.isNewMov)
        return
      this.commessaFilterDialog = true
    },
    searchCommessa() {
      this.commessaFilterDialog = false
      this.attendereDialog = true
      axios.get('/commessa/', {params: {
          codice: this.codicePerCommessa,
          descrizione: this.descrizionePerCommessa,
          ragioneSociale: this.RagioneSocialePerCommessa,
          stato: this.statoPerCommessa
      }}).then(res => {
        // eslint-disable-next-line
        console.log(res)
        this.attendereDialog = false
        this.listaCommesseCercate = res.data
        this.listaCommesseDialog = true
      }).catch(error => {
        // eslint-disable-next-line
        console.log(error)
        this.$store.dispatch('handleError', error.response.data)
      })
    },
    chooseCommessa(codice) {
      this.$store.commit('setCommessa', codice)
      this.listaCommesseDialog = false
    },
    calcTotTime(giornata) {
      var times
      if (giornata) {
        times = [
          this.$store.getters.getTimeG1,
          this.$store.getters.getTimeG2,
          this.$store.getters.getTimeG3,
          this.$store.getters.getTimeG4
        ]
      } else {
        times = [
          this.$store.getters.getTimeA1,
          this.$store.getters.getTimeA2,
          this.$store.getters.getTimeA3,
          this.$store.getters.getTimeA4
        ]
      }
      var t1 = moment(this.getTimeFromInteger(times[0]), "HH:mm")
      var t2 = moment(this.getTimeFromInteger(times[1]), "HH:mm")
      var mattino = t2.diff(t1)
      var t3 = moment(this.getTimeFromInteger(times[2]), "HH:mm")
      var t4 = moment(this.getTimeFromInteger(times[3]), "HH:mm")
      var pomeriggio = t4.diff(t3)
      var totale = moment(mattino).add(pomeriggio)
      totale = totale - 3600000 // Non so perché moment calcola un'ora in più. Comunque la tolgo.
      if (!isNaN(totale))
        return moment(totale).format("HH.mm")
    },
  }
}
</script>

<style>
.subtitle {
  height:10px;
}
</style>
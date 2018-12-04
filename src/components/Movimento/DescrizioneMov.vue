<template>
  <v-form v-model="valid">
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs6 md6 lg6>
        <v-menu ref="menuDate" :close-on-content-click="false" v-model="menuDate" :nudge-right="40" 
          lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
          <v-text-field slot="activator" v-model="dateFormatted" label="Data Movimento" 
            prepend-icon="event" @blur="date = parseDate(dateFormatted)" required>
          </v-text-field>
          <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
        </v-menu>
        </v-flex>
        <v-flex xs6 md6 lg6>
          <v-text-field v-model="commessa" :rules="commessaRules" :counter="8" 
            label="Commessa" append-icon="search" @click:append="showDialogCommessa()" required>
          </v-text-field>
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
          <v-text-field :value="calcTotTime(false)" label="Tot" single-line readonly></v-text-field>
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
          <v-text-field :value="calcTotTime(true)" label="Tot" single-line readonly></v-text-field>
        </v-flex>
        <!-- *** DESCRIZIONE *** -->
        <v-flex xs12>
          <v-subheader class="subtitle">Descrizione</v-subheader>
        </v-flex>  
        <v-flex xs12>
          <v-textarea rows="2" label="Nota"></v-textarea>
        </v-flex>
        <v-flex xs6 md4 lg3>
          <v-text-field label="Posizione"></v-text-field>
        </v-flex>
        <v-flex xs6 md4 lg3>
           <v-select :items="causali" label="Causali"></v-select>
        </v-flex>
        <v-flex xs6 md4 lg3>
           <v-select :items="cdl" label="CdL"></v-select>
        </v-flex>
        <v-flex xs6 md4 lg3>
           <v-select :items="cdc" label="CdC"></v-select>
        </v-flex>
      </v-layout>  
    </v-container>
  </v-form>
</template>

<script>

import moment from 'moment'

import utilities from "../../utilitiesMixin.js"

export default {
  data: (vm) => ({
    valid: false,
    commessa: "",
    commessaRules: [
      v => !!v || 'Commessa is required',
      v => v.length <= 8 || 'Name must be less than 8 characters'
    ],
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menuDate: false,
    timeG1: null,
    menuTimeG1: false,
    timeG2: null,
    menuTimeG2: false,
    timeG3: null,
    menuTimeG3: false,
    timeG4: null,
    menuTimeG4: false,
    timeA1: null,
    menuTimeA1: false,
    timeA2: null,
    menuTimeA2: false,
    timeA3: null,
    menuTimeA3: false,
    timeA4: null,
    menuTimeA4: false,
    causali: ['Foo', 'Bar', 'Fizz', 'Buzz'],
    cdl: ['Foo', 'Bar', 'Fizz', 'Buzz'],
    cdc: ['Foo', 'Bar', 'Fizz', 'Buzz'],
  }),
  computed: {
    computedDateFormatted () {
      return this.formatDate(this.date)
    }
  },
  watch: {
    date () {
      this.dateFormatted = this.formatDate(this.date)
    }
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
    allowedStep: m => m % 5 === 0,
    showDialogCommessa() {
      console.log("prova")
    },
    calcTotTime(giornata) {
      var times
      if (giornata) {
        times = [
          this.timeG1,
          this.timeG2,
          this.timeG3,
          this.timeG4
        ]
      } else {
        times = [
          this.timeA1,
          this.timeA2,
          this.timeA3,
          this.timeA4
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
      if (totale)
        return moment(totale).format("HH:mm")
    }
  }
}
</script>

<style>
.subtitle {
  height:10px;
}
</style>

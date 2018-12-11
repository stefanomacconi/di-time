<template>
  <div>
    <v-timeline align-top dense>
      <div v-for="(movimento, index) in movimenti" :key="movimento.numeroMovimento + Math.random() + index">
        <v-timeline-item v-if="differentDate(movimenti[index - 1], movimenti[index])" 
          :color="getDayColor(movimenti[index], index)">
          <!-- <v-img class="rounded" max-height="70px" max-width="500px" :src="getSeasonImage(movimento.data)"
            gradient="to top, rgba(0,0,0,.50), rgba(0,0,0,.50)"> -->
          <v-container fill-height>
            <v-layout>
              <div>
                <strong style="font-size: 15px;"> <!-- color="white" -->
                  {{ moment(movimento.data).locale('it').format('dddd, DD MMMM YYYY').toUpperCase() }}
                </strong>
                <div v-if="getOrariGiornata(movimento)"> <!-- color="white" -->
                  {{ getOrariGiornata(movimento) }}
                {{ "(" + moment(getTotalHourDay(movimento)).format("HH[h] mm[min]") + ")" }}
                </div>
                <div>
                  {{ moment(getTotalHourMovs(movimento.data, index)).format("HH[h] mm[min]") }}
                </div>
              </div>
            </v-layout>
          </v-container>
          <!-- </v-img> -->
        </v-timeline-item>
        <movimento :movimento="movimento"/>
        <v-divider inset v-if="!differentDate(movimenti[index + 1], movimenti[index])"></v-divider>
      </div>
    </v-timeline>
    <v-layout column class="fab-container">
      <v-btn dark fab class="primary" to="/movimento">
        <v-icon>add</v-icon>
      </v-btn>
    </v-layout>
    <v-btn v-if="moreMovs" dark flat icon small class="red" style="left:-3px" @click="more">
      <v-icon>arrow_drop_down</v-icon>
    </v-btn>
    <v-btn v-else dark flat icon small class="green" style="left:-3px">
      <v-icon>check</v-icon>
    </v-btn>
    <div class="text-xs-center">
      <v-dialog v-model="dialog" persistent width="300" >
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

import Movimento from './Movimento.vue'

import utilities from "../../utilitiesMixin.js"

export default {
  data: () => ({
    dialog: false,
    offset: 0,
    moreMovs: true
  }),
  computed: {
    movimenti() {
      return this.$store.getters.getMovimenti            
    },
  },
  components: {
    'movimento': Movimento
  },
  mixins: [utilities],
  methods: {
    more() {
      this.dialog = true
      this.offset += 50
      this.$store.dispatch('fetchMovimenti', this.offset).then(res => {
        if (res.data.length == 0) 
          this.moreMovs = false
        this.dialog = false
      })
    },
    differentDate(movimentoPrecedenteOSuccessivo, movimento) {
      if (movimentoPrecedenteOSuccessivo) {
        return movimentoPrecedenteOSuccessivo.data === movimento.data ? false : true
      }
      return true
    },
    getOrariGiornata(movimento) {
      var orariInizioMattino = this.getTimeFromInteger(movimento.oraInizioMattino)
      if (orariInizioMattino) {
        return orariInizioMattino + " - " +
          this.getTimeFromInteger(movimento.oraFineMattino) + " | " +
          this.getTimeFromInteger(movimento.oraInizioPomeriggio) + " - " +
          this.getTimeFromInteger(movimento.oraFinePomeriggio)
      }
    },
    getDayColor(movimento, index) {
      const totaleOreGiorno = moment.duration(this.getTotalHourDay(movimento)).asMilliseconds()
      const totaleOreMovs = moment.duration(this.getTotalHourMovs(movimento.data, index)).asMilliseconds()
      if (totaleOreGiorno == totaleOreMovs) {
        if (!movimento.definitivo)
          return "primary"
        else
          return "secondary"
      }
      if (totaleOreGiorno > totaleOreMovs)
        return "warning"
      if (totaleOreGiorno < totaleOreMovs)
        return "error"
    },
    getTotalHourDay(movimento) {
      var t1 = moment(this.getTimeFromInteger(movimento.oraInizioMattino), "HH:mm")
      var t2 = moment(this.getTimeFromInteger(movimento.oraFineMattino), "HH:mm")
      var mattino = t2.diff(t1)
      var t3 = moment(this.getTimeFromInteger(movimento.oraInizioPomeriggio), "HH:mm")
      var t4 = moment(this.getTimeFromInteger(movimento.oraFinePomeriggio), "HH:mm")
      var pomeriggio = t4.diff(t3)
      var totale = moment(mattino).add(pomeriggio)
      totale = totale - 3600000 // Non so perché moment calcola un'ora in più. Comunque la tolgo.
      return totale 
    },
    getTotalHourMovs(data, index) {
      var movs = []
      data = moment(data)
      for (var i = index; i < this.movimenti.length; i++) {
        var movimento = this.movimenti[i]
        var dataMov = moment(movimento.data)
        if (dataMov.isSame(data))
          movs.push(movimento)
        else
          break  
      }
      var totale = 0
      movs.forEach(mov => {
        totale = totale + moment.duration(mov.tempo,"h").asMilliseconds()
      })
      totale = totale - 3600000 // Non so perché moment calcola un'ora in più. Comunque la tolgo.
      return totale
    },
    /* getSeasonImage(time) {
      var date = new Date(time)
      var month = date.getMonth() + 1
      if (month >= 12 || month <= 3)
        return require('../../assets/img/winter.jpg')
      if (month >= 10 && month <= 11)
        return require('../../assets/img/fall.jpg')
      if (month >= 4 && month <= 6)
        return require('../../assets/img/spring.jpg')
      if (month >= 7 && month <= 9)
        return require('../../assets/img/summer.jpg')
    } */
  }
}
</script>

<style>
.fab-container {
  position: fixed;
  bottom: 50px;
  right: 10px;
}
.rounded {
  border-radius:25px;
}
</style>

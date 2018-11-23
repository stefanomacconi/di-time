<template>
  <router-link :to="{ name: 'movimento', params: { id: movimento.numeroMovimento }}" tag="div">
    <v-timeline-item small :color="movimento.colore">
      <v-layout pt-3>
        <v-flex xs4 md2>
          <div v-if="movimento.oraInizioAttMattino">
            <strong>{{ getOrariMovimentoMattina(movimento) }}</strong>
            <br>
          </div>
          <div v-if="movimento.oraInizioAttPomeriggio">
            <strong>{{ getOrariMovimentoPomeriggio(movimento) }}</strong>
            <br>
          </div>
          <div>
            {{ moment.utc(moment.duration(movimento.tempo,"h").asMilliseconds()).format("HH[h] mm[min]") }}
          </div>
        </v-flex>
        <v-flex xs8 md10> <!--offset-xs1 -->
          <strong>{{ movimento.commessa }}</strong>
          <div class="caption hidden-sm-and-up">
            <p>{{ movimento.descrizioneCommessa | truncate }}</p>
          </div>
          <div class="hidden-sm-and-up">
            {{ movimento.descrizione | truncate }}
          </div>
          <div class="hidden-xs-only">
            <p>{{ movimento.descrizioneCommessa }}</p>
          </div>
          <div class="hidden-xs-only">
            {{ movimento.descrizione }}
          </div>
        </v-flex>
      </v-layout>
    </v-timeline-item>
  </router-link>
</template>

<script>
export default {
    props: {
    movimento: {
        type: Object
    }
  },
  methods: {
    getOrariMovimentoMattina(movimento) {
      var orariMovimentoMattina = this.getTimeFromInteger(movimento.oraInizioAttMattino)
      if (orariMovimentoMattina) {
        return orariMovimentoMattina + " - " +
          this.getTimeFromInteger(movimento.oraFineAttMattino)
      }
    },
    getOrariMovimentoPomeriggio(movimento) {
      var orariMovimentoPomeriggio = this.getTimeFromInteger(movimento.oraInizioAttPomeriggio)
      if (orariMovimentoPomeriggio) {
        return orariMovimentoPomeriggio + " - " +
          this.getTimeFromInteger(movimento.oraFineAttPomeriggio)
      }
    },
    getTimeFromInteger(time) {
      var min = (time).toString().slice(-2)
      var hour = (time).toString().substring(0, (time).toString().length - 2)
      if (min && hour) 
        return hour + ":" + min
      return null
    },
    getSeasonImage(time) {
      var date = new Date(time)
      var month = date.getMonth() + 1
      if (month >= 12 || month <= 3)
        return require('../assets/img/winter.jpg')
      if (month >= 10 && month <= 11)
        return require('../assets/img/fall.jpg')
      if (month >= 4 && month <= 6)
        return require('../assets/img/spring.jpg')
      if (month >= 7 && month <= 9)
        return require('../assets/img/summer.jpg')
    }
  }
}
</script>
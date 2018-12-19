<template>
<div @click="selected(movimento.numeroMovimento)">
  <v-timeline-item small :color="getMovColor(movimento)">
    <router-link :to="toMovimento(movimento)" tag="div">
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
            {{ movimento.descrizioneCommessa | truncate }}
          </div>
          <div class="hidden-sm-and-up">
            {{ movimento.descrizione | truncate }}
          </div>
          <div class="caption hidden-xs-only">
            {{ movimento.descrizioneCommessa }}
          </div>
          <div class="hidden-xs-only">
            {{ movimento.descrizione }}
          </div>
        </v-flex>
      </v-layout>
    </router-link>
  </v-timeline-item>
  <v-divider v-if="!ultimo" inset></v-divider>
</div>
</template>

<script>

import utilities from "../../utilitiesMixin.js"

export default {
  props: {
    movimento: {
      type: Object
    },
    ultimo: {
      type: Boolean
    }
  },
  beforeDestroy() {
    this.$store.dispatch("clearMovimentiSelezionati")
  },
  methods: {
    selected(numeroMovimento){
      var movimenti = this.$store.getters.getMovimentiSelezionati
      var index = movimenti.indexOf(numeroMovimento)
      if (index === -1) 
        this.$store.dispatch("addToMovimentiSelezionati", numeroMovimento)
      else 
        this.$store.dispatch("removeToMovimentiSelezionati", index)
    },
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
    toMovimento(movimento) {
      if (!movimento.definitivo)
        return { name: 'movimento', params: { id: movimento.numeroMovimento }}
      else
        return "movimenti"
    },
    getMovColor(movimento) {
      var movimenti = this.$store.getters.getMovimentiSelezionati
      if (movimenti.indexOf(movimento.numeroMovimento) != -1)
        return "transparent"
      if (movimento.definitivo)
        return "secondary"
      return movimento.colore
    },
  },
  mixins: [utilities]
}
</script>
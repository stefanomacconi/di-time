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
    </v-timeline-item>
  </router-link>
</template>

<script>

import utilities from "../../utilitiesMixin.js"

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
  },
  mixins: [utilities]
}
</script>
<template>
  <div>
    <v-timeline align-top dense>
      <div v-for="(movimento, index) in movimenti" :key="movimento.numeroMovimento + Math.random() + index">
        <v-timeline-item v-if="differentDate(movimenti[index - 1], movimenti[index])" color="primary">
          <!-- <v-img class="rounded" max-height="70px" max-width="500px" :src="getSeasonImage(movimento.data)"
            gradient="to top, rgba(0,0,0,.50), rgba(0,0,0,.50)"> -->
            <v-container fill-height>
              <v-layout>
                <div>
                  <strong style="font-size: 15px;"> <!-- color="white" -->
                    {{ moment(movimento.data).locale('it').format('dddd, DD MMMM YYYY').toUpperCase() }}
                  </strong>
                  <br>
                  <font> <!-- color="white" -->
                    {{ getOrariGiornata(movimento) }}
                  </font>
                </div>
              </v-layout>
            </v-container>
          <!-- </v-img> -->
        </v-timeline-item>
        <movimento
          :movimento="movimento"
        />
        <v-divider inset v-if="!differentDate(movimenti[index + 1], movimenti[index])"></v-divider>
      </div>
    </v-timeline>
    <v-layout column class="fab-container">
      <v-btn dark fab class="primary" to="/nuovo">
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

import Movimento from './Movimento.vue';

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
    getTimeFromInteger(time) {
      var min = (time).toString().slice(-2)
      var hour = (time).toString().substring(0, (time).toString().length - 2)
      if (min && hour) 
        return hour + ":" + min
      return null
    }
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

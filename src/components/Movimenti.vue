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
        <router-link :to="{ name: 'movimento', params: { id: movimento.numeroMovimento }}" tag="div">
          <v-timeline-item small :color="colorNode(index)">
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
        <v-divider inset></v-divider>
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
    differentDate(movimentoPrecedente, movimento) {
      if (movimentoPrecedente) {
        return movimentoPrecedente.data === movimento.data ? false : true
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
    },
    randomColor() {
      return this.color[Math.floor(Math.random() * this.color.length)]
    },
    colorNode(index) {
      if (index % 2 == 0) 
        return "secondary"
      return "info"
    }
  },
  filters: {
  truncate: function (value) {
    if (!value) return ''
    value = value.toString()
    if(value.length > 50)
      return value.substring(0,49)+"...";
    return value
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

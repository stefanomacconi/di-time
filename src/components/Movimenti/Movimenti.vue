<template>
  <div>
    <v-timeline align-top dense>
      <div v-for="(dataMov, index) in dateMovFiltered" :key="dataMov.data + index">
        <giorno-movimenti :dataMov="dataMov"/>
      </div>
    </v-timeline>
    <v-layout column class="fab-container">
      <v-btn dark fab class="primary" to="/movimento">
        <v-icon>add</v-icon>
      </v-btn>
    </v-layout>
    <v-btn v-if="moreMovs" flat icon small color="white" class="light-blue" style="left:-3px"> <!-- @click="more" class="red" -->
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

import GiornoMovimenti from './GiornoMovimenti.vue'

export default {
  data: () => ({
    dialog: false,
    moreMovs: true
  }),
  computed: {
    dateMovFiltered() {
      var tzoffset = (new Date()).getTimezoneOffset() * 60000 //offset in milliseconds
      const msPicked = this.$store.getters.getPickedData
      var result = {}
      const values = Object.values(this.$store.getters.getDate)
      values.sort(this.compare)
      for (let index = 0; index < values.length; index++) {
        if (msPicked >= values[index].data) {
          // var data = new Date(values[index].data).toISOString().substr(0, 10)
          var data = new Date(values[index].data - tzoffset).toISOString().substr(0, 10)
          result[data] = this.$store.getters.getDate[data]
        }
      }
      return result
    }
  },
  components: {
    'giorno-movimenti': GiornoMovimenti
  },
  methods: {
    compare(a,b) {
      if (a.data > b.data)
        return -1
      if (a.data < b.data)
        return 1
      return 0
    },
    // more() {
      // commento perché le computed non vengono rinfrescate per il sidemenu
      /*this.dialog = true
      this.$store.dispatch('incrementOffset')
      this.$store.dispatch('fetchMovimenti', this.$store.getters.getOffset).then(res => {
        if (Object.keys(res.data).length === 0) 
          this.moreMovs = false
        this.dialog = false
      }) */
      // TODO refresh view altrimenti si hanno problemi con i movimenti a metà della prima GET
      // questo non funziona
    // this.$forceUpdate()
    // },
  }
}
</script>
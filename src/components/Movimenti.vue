<template>
  <div>
    <v-list v-for="(movimento, index) in movimenti" :key="movimento.numeroMovimento + Math.random() + index" dense class="pt-0">
      <v-list-tile to="/movimento">
        <v-list-tile-action>
          {{new Date(movimento.data).toISOString().substring(0, 10)}}
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{movimento.numeroMovimento}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-layout column class="fab-container">
      <v-btn dark fab class="primary" to="/nuovo">
        <v-icon>add</v-icon>
      </v-btn>
    </v-layout>
    <v-btn v-if="moreMovs" dark flat icon small class="secondary" @click="more">
      <v-icon>arrow_drop_down</v-icon>
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
          this.moreMovs = false;
        this.dialog = false
      })
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
</style>

<template>
  <div>
    <v-list v-for="movimento in movimenti" :key="movimento.numeroMovimento" dense class="pt-0">
      <v-list-tile to="/movimento">
        <v-list-tile-action>
          <v-icon>person</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{movimento.descrizione + new Date(movimento.data).toISOString().substring(0, 10)}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-layout column class="fab-container">
      <v-btn dark fab class="primary" to="/nuovo">
        <v-icon>add</v-icon>
      </v-btn>
    </v-layout>
  </div>
</template>

<script>
export default {
  data: () => ({
  }),
  computed: {
    movimenti() {
      return this.$store.getters.getMovimenti            
    },
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

<template>
  <div>
    <v-tabs-items v-model="tab">
      <v-tab-item :value="0">
        <descrizione-mov></descrizione-mov>
      </v-tab-item>
      <v-tab-item :value="1">
        <v-card>
          <v-card-text>Nota Spese</v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item :value="2">
        <v-card>
          <v-card-text>Lista</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>

import descrizioneMov from './DescrizioneMov.vue'

export default {
  data() {
    return {
      isNewMov: this.$store.getters.isNewMov,
    }
  },
  computed: {
    tab() {
      return this.$store.getters.getTab           
    },
  },
  components: {
    'descrizione-mov': descrizioneMov
  },
}
</script>

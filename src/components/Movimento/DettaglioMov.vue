<template>
  <div>
    <v-tabs-items v-model="tab">
      <v-tab-item :value="0">
        <descrizione-mov></descrizione-mov>
      </v-tab-item>
      <v-tab-item :value="1">
          <nota-spese-mov></nota-spese-mov>
      </v-tab-item>
      <v-tab-item :value="2">
          <lista-articoli-mov></lista-articoli-mov>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>

import descrizioneMov from './DescrizioneMov.vue'
import notaSpeseMov from './NotaSpeseMov.vue'
import listaArticoliMov from './ListaArticoliMov.vue'

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
    'descrizione-mov': descrizioneMov,
    'nota-spese-mov': notaSpeseMov,
    'lista-articoli-mov': listaArticoliMov
  },
}
</script>

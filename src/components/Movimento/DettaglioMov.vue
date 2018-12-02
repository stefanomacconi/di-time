<template>
  <div>
    MOVIMENTO {{ $route.params.id }}
    <v-tabs-items v-model="tab" class="white elevation-1">
      <v-tab-item :value="0">
        <v-card>
          <v-card-text>Descrizione</v-card-text>
        </v-card>
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
}
</script>

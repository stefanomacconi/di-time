<template>
  <div>
    <v-toolbar color='primary' dark fixed app clipped-right>
      <v-icon dark @click="goBack">close</v-icon>
      &nbsp;&nbsp;&nbsp;
      <v-toolbar-title>
        Nuovo Movimento
      </v-toolbar-title>
      <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn icon @click="nuovoMovimento">
            <v-icon>check_circle</v-icon>
          </v-btn>
        </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  data: () => ({
  }),
  methods: {
    goBack() {
        window.history.back()
    },
    nuovoMovimento() {

    }
  }
}
</script>
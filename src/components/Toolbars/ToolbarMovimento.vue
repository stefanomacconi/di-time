<template>
  <div>
    <v-toolbar color='primary' dark fixed app clipped-right>
      <v-icon dark @click="goBack">arrow_back</v-icon>
      &nbsp;&nbsp;&nbsp;
      <v-toolbar-title>
        Movimento XX
      </v-toolbar-title>
      <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn icon>
            <v-icon>print</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>attach_file</v-icon>
          </v-btn>
          <v-divider dark vertical></v-divider>
          <v-btn icon>
            <v-icon color="red accent-2">delete</v-icon>
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
    }
  }
}
</script>
<template>
  <v-app>
    <router-view name="toolbar"></router-view>
      <v-content> <!-- style="background-color: #E3F2FD;" -->
        <v-container fluid>
         <router-view></router-view>
        </v-container>
      </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>
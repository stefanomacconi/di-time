<template>
    <div>
        MOVIMENTI
        <v-list dense class="pt-0">
          <v-list-tile to="/movimento">
            <v-list-tile-action>
              <v-icon>person</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Movimento</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <div style="height: 100px; position: relative">
            <v-btn absolute dark fab top right class="primary" to="/nuovo">
                <v-icon>add</v-icon>
            </v-btn>
          </div>
        </v-list>


    </div>
</template>

<script>
</script>


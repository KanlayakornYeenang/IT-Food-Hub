<template>
  <v-sheet class="mx-auto pt-10">
    <v-slide-group show-arrows>
      <v-slide-group-item>
        <v-tabs color="it">
          <v-tab v-for="i in 25" :key="i">ของทอด</v-tab>
        </v-tabs>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
</template>

<style>
.v-tab--selected {
  font-weight: 600 !important;
}
</style>
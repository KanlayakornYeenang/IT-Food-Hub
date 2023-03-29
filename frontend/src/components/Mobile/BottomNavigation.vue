<template>
  <div class="d-md-none">
    <v-bottom-navigation grow>
      <v-btn value="recent">
        <v-icon>mdi-home</v-icon>
        Home
      </v-btn>

      <v-btn value="favorites">
        <v-icon>mdi-receipt-text</v-icon>
        Orders
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<style scoped>
.d-md-none .v-bottom-navigation {
  left: 0 !important;
  width: 100vw !important;
}
</style>

<script>
export default {
  props: {
    active: {
      type: Boolean,
    },
  },
};
</script>
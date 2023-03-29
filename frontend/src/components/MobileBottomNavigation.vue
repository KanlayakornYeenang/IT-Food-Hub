<template>
  <div>
    <v-bottom-navigation grow :active="active">
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

<script>
export default {
  props: {
    active: {
      type: Boolean,
    },
  },
};
</script>
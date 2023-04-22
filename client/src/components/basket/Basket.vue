<template>
  <v-card color="#f7f7f7" style="min-width: 25vw">
    <v-card-text>
      {{ basket }}
    </v-card-text>
    <v-card-actions>
      <v-btn @click="this.$emit('updateDialog', false)" color="primary" block
        >Close Dialog</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      //
    };
  },
  props: {
    basket: {
      type: Object,
    },
  },
};
</script>
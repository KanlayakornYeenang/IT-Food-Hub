<template>
  <v-card
    color="it"
    class="w-100"
    elevation="2"
    rounded="lg"
    :to="'/itfoodhub/'+restaurant.rst_id"
  >
    <v-img
      cover
      height="180"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>
    <v-card-item class="pa-3">
      <v-card-title class="d-flex justify-space-between"
        ><p class="text-amber fw-600">{{restaurant.rst_name}}</p>
        <v-chip class="bg-success">เปิด</v-chip></v-card-title
      >
      <v-chip-group>
        <v-chip>อาหารทานเล่น</v-chip>
        <v-chip>เครื่องดื่ม</v-chip>
      </v-chip-group>
    </v-card-item>
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
    restaurant: {
      type: Object,
    },
  },
};
</script>
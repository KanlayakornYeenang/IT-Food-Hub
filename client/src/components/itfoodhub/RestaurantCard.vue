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
      :src="(restaurant.file_path !=null) ? file_path :second_file_path"
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
      file_path: 'http://localhost:5000'+ this.restaurant.file_path,
      second_file_path: 'https://endlessicons.com/wp-content/uploads/2012/11/image-holder-icon-614x460.png'
    };
  },
  props: {
    restaurant: {
      type: Object,
    },
  },
};
</script>
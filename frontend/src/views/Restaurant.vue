<template>
  <v-main>
    <v-img
      src="https://cdn.discordapp.com/attachments/812749326543487058/1074303855329816586/image_1.png"
      height="350"
      cover
    ></v-img>
    <div class="pa-12">
      <RestaurantBanner />
    </div>
  </v-main>
</template>

<script setup>
import RestaurantBanner from "@/components/RestaurantBanner.vue";
</script>

<script>
export default {
  data: () => ({}),
  props: {
    //
  },
  beforeCreate() {
    //   axios
    //     .get("http://localhost:5000/api/itfoodhub/" + restaurant.Restaurant_name)
    //     .then(
    //       (res) => {
    //         if (res.data) {
    //           this.$router.push("/itfoodhub/" + restaurant.Restaurant_name);
    //         }
    //       },
    //       (res) => {
    //         if (res.response.data != undefined) {
    //           //
    //         }
    //       }
    //     );
  },
};
</script>
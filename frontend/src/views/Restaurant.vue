<template>
  <v-main>
    <v-img
      src="https://cdn.discordapp.com/attachments/812749326543487058/1074303855329816586/image_1.png"
      height="350"
      cover
    ></v-img>
    <div class="pa-12">
      <RestaurantBanner :restaurant="dynamicData" />
    </div>
  </v-main>
</template>

<script setup>
import RestaurantBanner from "@/components/RestaurantBanner.vue";
</script>

<script>

export default {
  data: () => ({
    dynamicData: {},
  }),
  props: {
    //
  },
  beforeCreate() {
    axios
      .get(
        "http://localhost:5000/api/itfoodhub/" +
          decodeURIComponent(this.$route.path.split("/")[2])
      )
      .then(
        (res) => {
          if (res.data) {
            this.dynamicData = res.data;
          }
        },
        (res) => {
          if (res.response.data != undefined) {
            //
          }
        }
      );
  },
};
</script>
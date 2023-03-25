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
  beforeCreate() {
    console.log("test", this.data);
  },
};
</script>
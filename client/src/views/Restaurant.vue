<template>
  <div>
    <v-container fluid class="pa-0">
      <Header :restaurant="restaurant" />
    </v-container>
    <v-container fluid class="pa-0 bg-grey-lighten-4">
      <v-divider></v-divider>
      <div class="d-flex justify-center align-center">
        <v-col cols="8" class="mt-6 mb-10">
          <v-card class="w-100 mb-6" color="transparent" elevation="0">
            <v-card-item class="pa-0">
              <v-card-title> <p class="text-h3 fw-600">ของทอด</p></v-card-title>
            </v-card-item>
          </v-card>
          <v-row class="py-2">
            <v-col cols="12" sm="3" v-for="(item, i) in menu" :key="i">
              <MenuCard :restaurant_name="restaurant.rst_name" :menu="item" />
            </v-col>
          </v-row>
        </v-col>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import Header from "@/components/restaurant/Header.vue";
import MenuCard from "@/components/restaurant/MenuCard.vue";
</script>

<script>
import axios from "@/plugins/axios.js";

export default {
  data() {
    return {
      restaurant: null,
      menu: null,
    };
  },
  mounted() {
    axios
      .get(this.$route.path)
      .then((res) => {
        this.restaurant = res.data.restaurant;
        this.menu = res.data.menu;
      })
      .catch((err) => {
        this.$router.push("/");
      });
  },
};
</script>
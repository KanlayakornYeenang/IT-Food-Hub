<template>
  <div>
    <v-container fluid class="pa-0">
      <Header />
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
            <v-col cols="12" sm="3" v-for="(menu, i) in menus" :key="i">
              <MenuCard :menu="menu" />
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
      menus: null,
    };
  },
  mounted() {
    axios
      .get(this.$route.path)
      .then((res) => {
        this.menus = res.data;
        console.log(res.data);
      })
      .catch((err) => {
        this.$router.push("/");
      });
  },
};
</script>
<template>
  <div>
    <v-container fluid class="pa-0">
      <Header />
    </v-container>
    <v-container fluid class="pa-0 bg-grey-lighten-4">
      <v-divider></v-divider>
      <div class="d-flex justify-center align-center">
        <v-col cols="8" class="">
          <v-card class="w-100 my-6" color="transparent" elevation="0">
            <v-card-item class="pa-0">
              <v-card-title>
                <p class="text-h3 fw-600">ของทอด</p></v-card-title
              >
            </v-card-item>
          </v-card>
          <v-row class="py-2">
            <v-col cols="12" sm="3" v-for="i in 5" :key="i"
              ><v-card rounded="lg" elevation="2" class="overflow-hidden">
                <v-img
                  src="https://d21dsidbdoi5kv.cloudfront.net/wp-content/uploads/2022/09/5-13.jpg"
                ></v-img>
                <v-card-item>
                  <v-card-title>นักเก็ต</v-card-title>
                  <v-card-subtitle class="my-2">1 ไม้ / 3 ชิ้น</v-card-subtitle>
                  <v-card-actions class="d-flex justify-space-between">
                    <v-card-title class="fw-600">15</v-card-title>
                    <v-btn
                      elevation="2"
                      class="bg-success pa-0 ma-0"
                      size="small"
                      ><v-icon>mdi-plus</v-icon></v-btn
                    >
                  </v-card-actions>
                </v-card-item></v-card
              ></v-col
            >
          </v-row>
        </v-col>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import Header from "@/components/restaurant/Header.vue";
</script>
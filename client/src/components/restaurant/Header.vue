<template>
  <div class="d-flex justify-center align-center pt-10">
    <v-col cols="8" class="bg-white banner d-flex rounded-lg">
      <v-card class="w-100" elevation="0">
        <v-card-item v-if="restaurant" class="pa-0">
          <v-breadcrumbs v-if="items" :items="items" class="pa-0 my-1">
            <template v-slot:divider>
              <v-icon icon="mdi-chevron-right"></v-icon>
            </template>
          </v-breadcrumbs>
          <v-card-title>
            <p class="text-h3 fw-600">
              {{ restaurant.rst_name }}
            </p></v-card-title
          >
          <v-chip-group>
            <v-chip>TEST</v-chip>
            <v-chip>TEST</v-chip> </v-chip-group
          ><v-card-subtitle class="d-flex my-1">
            <v-icon class="mr-1">mdi-clock-time-four</v-icon>
            <span class="d-flex"
              ><p class="fw-600 text-black">เวลาเปิดให้บริการ</p>
              <div class="mx-2"></div>
              วันนี้ TEST-TEST</span
            >
          </v-card-subtitle>
        </v-card-item>
        <Category />
      </v-card>
    </v-col>
  </div>
</template>

<script setup>
import Category from "@/components/restaurant/header/Category.vue";
</script>

<script>
export default {
  props: {
    restaurant: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      items: null,
    };
  },
  mounted() {
    if (this.restaurant) {
      this.items = [
        {
          title: "หน้าแรก",
          disabled: false,
          href: "/itfoodhub",
        },
        {
          title: this.restaurant.rst_name,
          disabled: true,
        },
      ];
    }
  },
};
</script>

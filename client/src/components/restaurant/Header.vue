<template>
  <div class="d-flex justify-center pt-10" style="height:390px">
    <v-col cols="8" class="bg-white banner rounded-lg">
      <v-card class="w-100 h-100 d-flex flex-column" elevation="0">

        <v-card-item v-if="restaurant" class="pa-0 align-self-start flex-grow-1">
          <v-breadcrumbs :items="items" class="pa-0 my-1">
            <template v-slot:divider>
              <v-icon icon="mdi-chevron-right"></v-icon>
            </template>
          </v-breadcrumbs>
          <v-card-title>
            <p class="text-h3 fw-600">
              {{ restaurant.rst_name }}
            </p>
          </v-card-title>
          <v-chip-group>
            <v-chip>TEST</v-chip>
            <v-chip>TEST</v-chip> </v-chip-group><v-card-subtitle class="d-flex my-1">
            <v-icon class="mr-1">mdi-clock-time-four</v-icon>
            <span class="d-flex">
              <p class="fw-600 text-black">เวลาเปิดให้บริการ</p>
              <div class="mx-2"></div>
              วันนี้ TEST-TEST
            </span>
          </v-card-subtitle>
        </v-card-item>

        <div class="align-self-start mt-auto">
          <Category :categories="categories"/>
        </div>

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
    categories: {
      type: Array
    }
  },
  data() {
    return {
      //
    };
  },
  computed: {
    items() {
      return [
        {
          title: "หน้าแรก",
          disabled: false,
          href: "/itfoodhub",
        },
        {
          title: this.restaurant ? this.restaurant.rst_name : "กำลังโหลด...",
          disabled: true,
        },
      ];
    },
  },
};
</script>

<template>
  <v-card
    class="overflow-auto"
    style="width: 35rem; height: 50rem"
    rounded="xl"
  >
    <!-- Header -->
    <v-sheet class="header text-center w-100" rounded="xl">
      <p class="ma-5" style="font-weight: 700">My Cart</p>
      <v-divider></v-divider>
    </v-sheet>

    <MyCartOrder />
  </v-card>
</template>

<script setup>
import MyCartOrder from "@/components/MyCartOrder.vue";
</script>

<style scoped>
.v-sheet {
  position: fixed;
  z-index: 1;
  border-bottom-right-radius: 0 !important;
}
</style>
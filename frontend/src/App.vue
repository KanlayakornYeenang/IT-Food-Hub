<template>
  <v-card>
    <v-layout >
      <router-view />
    </v-layout>
  </v-card>
</template>

<script setup>
import { useRoute } from "vue-router";
import LeftNavigation from "@/components/LeftNavigation.vue";
import RightProfile from "@/components/RightProfile.vue";
</script>
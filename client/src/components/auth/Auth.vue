<template>
  <v-container fluid>
    <v-col class="d-flex bg-white pa-0 sheet rounded-lg" cols="7">
      <Banner />
      <LogIn />
    </v-col>
  </v-container>
</template>

<style scoped>
.v-container {
  background: #ebf2fc;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.sheet {
  box-shadow: rgba(17, 17, 26, 0.1) 0px 8px 24px,
    rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px;
}
</style>

<script setup>
import Banner from "@/components/Auth/Banner.vue";
import LogIn from "@/components/Auth/LogIn.vue";
</script>

<script>
export default {  
  data() {
    return {
      //
    };
  },
};
</script>
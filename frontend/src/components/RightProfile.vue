<template>
  <v-navigation-drawer permanent location="right">
    <div class="pa-6 mt-8">
      <div class="d-flex justify-space-between">
        <p class="h2">My Profile</p>
        <v-btn icon="mdi-pencil" size="x-small"></v-btn>
      </div>
      <div class="my-5 d-flex flex-column align-center">
        <v-avatar color="#FE6612" size="60">
          <span class="text-h5" style="color: white">KY</span>
        </v-avatar>
        <p class="pt-2">
          {{userDetail.Customer_Fname +" "+userDetail.Customer_Lname}}
        </p>
      </div>
      <v-divider class="my-5"></v-divider>
      <v-btn class="text-it w-100 my-1" rounded="pill" size="small"
          @click="showRegisRes = !showRegisRes"
          v-if='userDetail.Customer_isOwner == 0'
        >Sign up as a restaurant</v-btn
      >
      <v-btn class="text-foodhub w-100 my-1" rounded="pill" size="small"
      @click="showRegisRider = !showRegisRider"
          v-if='userDetail.Customer_isDelivery == 0'
        >Sign up as a deliver</v-btn
      >
    </div>
  </v-navigation-drawer>
  <v-overlay v-model="showRegisRes" class="d-flex justify-center align-center">
    <RegisterRestuatrant />
  </v-overlay>
  <v-overlay v-model="showRegisRider" class="d-flex justify-center align-center">
    <RegisterRider />
  </v-overlay>
  
</template>
<script setup>
  import RegisterRestuatrant from "./RegisterRestuarant.vue"
  import RegisterRider from "./RegisterRider.vue";
</script>
<script>
  
  export default {
    data() {
      return {
        showRegisRes: false,
        showRegisRider: false,
        isOwner :'0'
      };
    },
    props:{
      userDetail: {
        type : Object
      }
    }
     
  }
</script>

<style scoped>
.text {
  font-family: "Mitr", sans-serif !important;
}

.navigation {
  width: 100% !important;
}
</style>
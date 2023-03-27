<template>
  <!-- v-navi  if widht < 1200 widht = 200 ; My-profile = 20px if width < 1200 -->
   <!-- v-navi  if widht < 1200 widht = 200 ; My-profile = 30px if width > 1200 -->
  <v-navigation-drawer permanent location="right"
    :style="{'width': widhtNavi+'px'}"
  >
    <div class="pa-6 mt-8">
      <div class="d-flex justify-space-between">
        <p 
          :style="{'font-size' : fontProfile+'px', 'font-weight' :'bold'}"
        >My Profile</p>
        <v-btn icon="mdi-pencil" size="x-small"></v-btn>
      </div>
      <div class="my-5 d-flex flex-column align-center">
        <v-avatar color="#FE6612" size="60">
          <span class="text-h4" style="color: white">KY</span>
        </v-avatar>
        <p class="pt-2"
        >
          {{userDetail.Customer_Fname +" "+userDetail.Customer_Lname}}
        </p>
      </div>
      <v-divider class="my-5"></v-divider>
       <!-- v-btn if widht < 1200 font-size = 10;   -->
      <v-btn class="w-100 my-2" rounded="pill"
          @click="showRegisRes = !showRegisRes"
          v-if='userDetail.Customer_isOwner == 0'
        >
        <p 
        :style="{'fontSize': fontsize+'px'}"
        >Sign up as a restaurant</p></v-btn
      >
      <v-btn class="text-foodhub w-100  my-2" rounded="pill"
          size="small"
          @click="showRegisRider = !showRegisRider"
          v-if='userDetail.Customer_isDelivery == 0'
        ><p
        :style="{'fontSize': fontsize+'px'}"
        >Become a Delivery </p></v-btn
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
        isOwner :'0',
        windowWidth: window.innerWidth,
        widhtNavi : 300,
        fontProfile : 30,
        fontsize : 15
      };
    },
    props:{
      userDetail: {
        type : Object
      }
    },
  mounted() {
    console.log("mounted")
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
  },
  methods: {  
    onResize() {
      this.windowWidth = window.innerWidth
      if(this.windowWidth > 1200){
        this.widhtNavi = 300
        this.fontSize = 15
        this.fontProfile = 30
      }else{
        this.widhtNavi = 200
        this.fontsize = 9
        this. fontProfile = 21
      }

    }
    },
     
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
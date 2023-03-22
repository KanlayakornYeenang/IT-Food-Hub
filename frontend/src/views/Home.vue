<template>
  <v-main>
    <div class="pa-12">
      <HeaderSearchBar />
      <HomeBanner />
      <HomeCategories />
      <HomeRestaurantList />
    </div>
  </v-main>
</template>

<script setup>
import HeaderSearchBar from "@/components/HeaderSearchBar.vue";
import HomeBanner from "@/components/HomeBanner.vue";
import HomeCategories from "@/components/HomeCategories.vue";
import HomeRestaurantList from "@/layouts/default/HomeRestaurantList.vue";
</script>
<script>
  import axios from "axios";
   export default {
    data: ()=>({
      refresh_token: '',
      access_token : ''

    }),
    beforeCreate(){
      // get refresh token and access token
      this.refresh_token = localStorage.getItem('refresh_token');
      this.access_token =  localStorage.getItem('access_token');
      axios.get('http://localhost:5000/api/login',{
        headers:{
          Authorization: 'Bearer ' + this.access_token
        }
      })

    }
   }
</script>
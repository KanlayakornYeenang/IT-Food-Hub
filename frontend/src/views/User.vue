<template>
  <LeftNavigation :userDetail="userDetail"
    v-if="windowWidth > 1024"
  ></LeftNavigation>
  <router-view :data="dynamicData"></router-view>
  <!-- eslint-disable -->
  <RightProfile :userDetail="userDetail"
    v-if="windowWidth > 1024"
  ></RightProfile>
  <BottomNavigator
    v-if="windowWidth < 1024"
  >

  </BottomNavigator>
</template>

<script setup >
import HeaderSearchBar from "@/components/HeaderSearchBar.vue";
import HomeBanner from "@/components/HomeBanner.vue";
import HomeCategories from "@/components/HomeCategories.vue";
import HomeRestaurantList from "@/layouts/default/HomeRestaurantList.vue";
import LeftNavigation from "@/components/LeftNavigation.vue";
import RightProfile from "@/components/RightProfile.vue";
import BottomNavigator from "@/components/BottomNavigator.vue";
</script>
<script >
import axios from "axios";  
import { computed } from 'vue'
import { useDisplay } from 'vuetify'
import { onMounted } from 'vue'
export default {
  data: () => ({
    refresh_token: "",
    access_token: "",
    nameUser: "",
    userDetail: {},
    name: "",
    dynamicData: [],
    windowHeight: window.innerHeight,
    windowWidth: window.innerWidth
  }),
  mounted() {
    console.log("mounted")
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
  },
  methods: {  
    onResize() {
      this.windowHeight = window.innerHeight
      this.windowWidth = window.innerWidth
    }
  },
  watch:{
    windowHeight(old, newValue){
      console.log(old)
    }
  },
  beforeCreate() {
    // get refresh token and access toke
    console.log("beforeCreate-at-HomePage");
    this.refresh_token = localStorage.getItem("refresh_token");
    this.access_token = localStorage.getItem("access_token");
    axios
      .get("http://localhost:5000/api/itfoodhub", {
        headers: {
          Authorization: "Bearer " + this.access_token,
        },
      })
      .then(
        (res) => {
          this.userDetail = res.data.users[0];
          this.dynamicData = res.data.restuarants;
          this.dynamicData = JSON.parse(JSON.stringify(this.dynamicData));

        },
        (res) => {
          this.$router.replace('/');
        }
      );
  },
};
</script>
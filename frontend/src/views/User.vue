<template>
  <LeftNavigation :userDetail="userDetail"></LeftNavigation>
  <router-view :data="dynamicData"></router-view>
  <!-- eslint-disable -->
  <RightProfile :userDetail="userDetail"></RightProfile>
</template>

<script setup >
import HeaderSearchBar from "@/components/HeaderSearchBar.vue";
import HomeBanner from "@/components/HomeBanner.vue";
import HomeCategories from "@/components/HomeCategories.vue";
import HomeRestaurantList from "@/layouts/default/HomeRestaurantList.vue";
import LeftNavigation from "@/components/LeftNavigation.vue";
import RightProfile from "@/components/RightProfile.vue";
</script>
<script >
import axios from "axios";
export default {
  data: () => ({
    refresh_token: "",
    access_token: "",
    nameUser: "",
    userDetail: {},
    name: "",
    dynamicData: [],
  }),
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
          console.log(this.dynamicData);
        },
        (res) => {
          this.$router.push("/");
        }
      );
  },
};
</script>
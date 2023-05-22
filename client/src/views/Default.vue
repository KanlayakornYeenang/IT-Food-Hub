<template>
  <v-card>
    <v-layout>
      <PrivateNav :user="user" @search-text-changed="handleSearchTextChanged" />
      <v-main>
        <router-view :user="user" :searchText="searchText"/>
        <!-- <Footer /> -->
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup>
import PrivateNav from "@/components/nav/PrivateNav.vue";
import Footer from "@/components/footer/Footer.vue";
</script>

<script>
import axios from "@/plugins/axios.js";

export default {
  data() {
    return {
      user: null,
      noti: null,
      searchText: ''
    };
  },
  methods: {
    handleSearchTextChanged(newText) {
      this.searchText = newText;
    },
  },
  mounted() {
    axios
      .get("api/user")
      .then((res) => {
        this.user = res.data;
      })
      .catch((err) => {
        this.$router.push("/login");
      }); 
    localStorage.setItem("noti", 0)
  },
};
</script> 
<template>
  <v-card>
    <v-layout>
      <PrivateNav :user="user" />
      <v-main>
        <router-view :user="user" />
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
    };
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
  },
};
</script>
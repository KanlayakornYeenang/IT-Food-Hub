<template>
  <v-card>
    <v-layout>
      <v-app-bar color="it" height="80" elevation="0">
        <div class="w-100 d-flex justify-space-around">
          <v-sheet cols="1" color="transparent">
            <v-img :width="100" src="@/assets/logo-white.png"></v-img>
          </v-sheet>
          <div>
            <v-btn size="large" prepend-icon="mdi-home">
              <p class="text-body-1 fw-600">หน้าแรก</p>
            </v-btn>
            <v-btn size="large" prepend-icon="mdi-receipt-text">
              <p class="text-body-1 fw-600">รายการ</p>
            </v-btn>
            <v-btn v-if="user" size="large" prepend-icon="mdi-account">
              <p class="text-body-1 fw-600">{{ user.user_fname }}</p>
            </v-btn>
          </div>
        </div>
      </v-app-bar>
      <v-main>
        <router-view :user="user"/>
      </v-main>
    </v-layout>
  </v-card>
</template>

<style>
.v-navigation-drawer {
  height: fit-content !important;
}
</style>

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
        this.$router.push("/");
      });
  },
};
</script>
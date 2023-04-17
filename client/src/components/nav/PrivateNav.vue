<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer location="top" color="it" float class="pa-2">
        <v-list nav class="d-flex justify-space-around">
          <v-sheet cols="1" color="transparent">
            <v-img :width="90" src="@/assets/logo-white.png"></v-img>
          </v-sheet>
          <div>
            <v-btn
              class="mx-2"
              size="large"
              elevation="0"
              color="transparent"
              prepend-icon="mdi-home"
              ><p class="th-b text-body-1 fw-600">หน้าแรก</p></v-btn
            >
            <v-btn
              class="mx-2"
              size="large"
              elevation="0"
              color="transparent"
              prepend-icon="mdi-receipt-text"
              ><p class="th-b text-body-1 fw-600">รายการ</p></v-btn
            >
            <v-btn
              v-if="user"
              class="mx-2"
              size="large"
              elevation="0"
              color="transparent"
              prepend-icon="mdi-account"
            >
              <p class="th-b text-body-1 fw-600">
                {{ user.user_fname[0] + user.user_lname[0] }}
              </p></v-btn
            >
          </div>
        </v-list>
      </v-navigation-drawer>
      <v-main style="min-height: 100vh">
        <router-view />
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
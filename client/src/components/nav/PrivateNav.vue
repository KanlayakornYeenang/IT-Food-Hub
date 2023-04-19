<template>
  <v-card>
    <v-layout>
      <v-app-bar color="it" height="145" elevation="0">
        <v-col cols="8" class="d-flex flex-column mx-auto">
          <div class="d-flex justify-space-between my-2">
            <div>
              <v-btn size="small">
                <p class="text-body-1 fw-600">สมัครเป็นพาร์ทเนอร์ร้านอาหาร</p>
              </v-btn>
              <v-btn size="small">
                <p class="text-body-1 fw-600">สมัครเป็นคนส่งอาหาร</p>
              </v-btn>
            </div>
            <div>
              <v-btn size="small" prepend-icon="mdi-bell">
                <p class="text-body-1 fw-600">การแจ้งเตือน</p>
              </v-btn>
              <v-btn size="small" prepend-icon="mdi-receipt-text">
                <p class="text-body-1 fw-600">รายการ</p>
              </v-btn>
              <v-btn v-if="user" size="small" prepend-icon="mdi-account">
                <p class="text-body-1 fw-600">{{ user.user_fname }}</p>
              </v-btn>
            </div>
          </div>
          <div class="d-flex justify-space-between align-end my-2">
            <v-sheet color="transparent" class="mr-10 ml-7">
              <v-img :width="125" src="@/assets/logo-white.png"></v-img>
            </v-sheet>
            <v-text-field
              placeholder="Search IT FOOD HUB"
              variant="solo"
              hide-details
              append-inner-icon="mdi-magnify"
            ></v-text-field>
            <v-btn icon class="mx-10"
              ><v-icon size="x-large">mdi-shopping</v-icon></v-btn
            >
          </div>
        </v-col>
      </v-app-bar>
      <v-main>
        <router-view :user="user" />
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
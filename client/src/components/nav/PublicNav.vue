<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer location="top" color="it" float class="pa-2">
        <v-list nav class="d-flex justify-space-around">
          <v-sheet cols="1" color="transparent">
            <v-img :width="90" src="@/assets/logo-white.png"></v-img>
          </v-sheet>
          <div>
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn
                  size="large"
                  color="transparent"
                  v-bind="props"
                  elevation="0"
                  class="mx-3"
                >
                  <p class="th-b text-body-1 fw-600">สมัครเป็นพาร์ทเนอร์</p>
                  <v-icon size="x-large">mdi-chevron-down</v-icon>
                </v-btn>
                <router-link to="/login">
                  <v-btn size="large" color="foodhub" elevation="0">
                    <p class="th-b text-body-1 fw-600">
                      เข้าสู่ระบบ / ลงทะเบียน
                    </p>
                  </v-btn>
                </router-link>
              </template>

              <v-list>
                <v-list-item v-for="(item, index) in items" :key="index">
                  <div>
                    <p class="th-b text-body-1 fw-600">
                      {{ item.title }}
                    </p>
                  </div>
                </v-list-item>
              </v-list>
            </v-menu>
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
export default {
  data: () => ({
    items: [{ title: "ร้านอาหาร" }, { title: "คนส่งอาหาร" }],
  }),
};
</script>
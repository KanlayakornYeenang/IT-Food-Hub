<template>
  <div>
    <v-navigation-drawer permanent location="left" class="align-center">
      <template v-slot:prepend>
        <v-img class="mt-12" contain width="180" src="@/assets/logo.svg" />
      </template>

      <div class="py-16">
        <v-btn-toggle
          class="d-flex flex-column"
          style="height: fit-content"
          color="it"
          v-model="select"
        >
          <v-btn
            :ripple="{ class: 'text-it' }"
            class="mb-4"
            rounded="pill"
            value="home"
          >
            <v-icon> mdi-home-outline </v-icon>
            <div class="px-2"></div>
            <div style="font-weight: 600">Home</div>
          </v-btn>
        </v-btn-toggle>

        <v-btn
          class="elevation-0 mb-4"
          rounded="pill"
          value="cart"
          :ripple="{ class: 'text-it' }"
          @click="showCart = !showCart"
        >
          <v-icon> mdi-shopping-outline </v-icon>
          <div class="px-2"></div>
          <div style="font-weight: 600">My Cart</div>
        </v-btn>

        <v-btn-toggle
          class="d-flex flex-column"
          style="height: fit-content"
          color="it"
          v-model="select"
        >
          <v-btn
            :ripple="{ class: 'text-it' }"
            class="mb-4"
            rounded="pill"
            value="orders"
          >
            <v-icon> mdi-update </v-icon>
            <div class="px-2"></div>
            <div style="font-weight: 600">Orders</div>
          </v-btn>

          <v-btn :ripple="{ class: 'text-it' }" rounded="pill" value="message">
            <v-icon> mdi-message-processing-outline </v-icon>
            <div class="px-2"></div>
            <div style="font-weight: 600">Messages</div>
          </v-btn>
        </v-btn-toggle>
      </div>
    </v-navigation-drawer>
      <v-overlay v-model="showCart" class="d-flex justify-center align-center">
        <MyCartOverlay />
      </v-overlay>
  </div>
</template>

<style lang="scss" scoped>
.bg-it {
  --v-theme-overlay-multiplier: 0;
}
.v-icon {
  font-size: 2rem;
}
.v-btn {
  display: flex;
  width: 100%;
  justify-content: space-between;
  min-height: 3.5rem;
}
</style>

<script setup>
import MyCartOverlay from "@/components/MyCartOverlay.vue";
</script>


<script>
export default {
  data() {
    return {
      select: "home",
      showCart: false,
    };
  },
  watch: {
    select(newValue) {
      if (newValue == undefined) {
        this.select = "home";
      }
    },
  },
};
</script>
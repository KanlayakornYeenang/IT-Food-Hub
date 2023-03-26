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
          <router-link to="/itfoodhub">
            <v-btn class="mb-4" rounded="pill" value="home">
              <v-icon>
                <font-awesome-icon :icon="['fas', 'house']" size="xs" />
              </v-icon>
              <div class="px-2"></div>
              <div style="font-weight: 600">Home</div>
            </v-btn>
          </router-link>
        </v-btn-toggle>

        <v-btn
          class="elevation-0 mb-4"
          rounded="pill"
          value="cart"
          @click="showCart = !showCart"
        >
          <v-icon>
            <font-awesome-icon :icon="['fas', 'basket-shopping']" size="xs" />
          </v-icon>
          <div class="px-2"></div>
          <div style="font-weight: 600">My Cart</div>
        </v-btn>

        <v-btn-toggle
          class="d-flex flex-column"
          style="height: fit-content"
          color="it"
          v-model="select"
        >
          <v-btn class="mb-4" rounded="pill" value="orders">
            <v-icon>
              <font-awesome-icon :icon="['fas', 'receipt']" size="xs" />
            </v-icon>
            <div class="px-2"></div>
            <div style="font-weight: 600">Orders</div>
          </v-btn>

          <v-btn
            class="mb-4"
            rounded="pill"
            value="Restuarant"
            v-if="userDetail.Customer_isOwner == 0"
          >
            <v-icon>
              <font-awesome-icon :icon="['fas', 'store']" size="xs" />
            </v-icon>
            <div class="px-2"></div>
            <div style="font-weight: 600">My Restaurant</div>
          </v-btn>

          <v-btn
            rounded="pill"
            value="Delivery"
            v-if="userDetail.Customer_isDelivery == 0"
          >
            <v-icon>
              <font-awesome-icon :icon="['fas', 'hand']" size="xs" />
            </v-icon>
            <div class="px-2"></div>
            <div style="font-weight: 600">Pick order</div>
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
      if (newValue == undefined && this.$route.path == "/itfoodhub") {
        this.select = "home";
      }
    },
    path(newValue) {
      if (!["/itfoodhub"].includes(newValue)) {
        this.select = "";
      }
    },
  },
  computed: {
    path() {
      return (this.path = this.$route.path);
    },
  },
  props: {
    userDetail: {
      type: Object,
    },
  },
  beforeCreate() {
    console.log("left");
  },
};
</script>
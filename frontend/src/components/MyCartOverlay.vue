<template>
  <!--  overlay menu component      เป็น over lay ใน ร้านค้า -->
  <v-sheet v-scroll.self="onScroll" class="overflow-y-auto" rounded="xl">
    <div class="header" style="background: white; position: fixed">
      <p class="text-center" style="font-weight: 700">My Cart</p>
    </div>
    <div style="padding-top: 5.1rem">
      <div class="px-8"><v-divider></v-divider></div>
      <MyCartOrder />
    </div>
  </v-sheet>
</template>

<style scoped>
.header {
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  padding: 5%;
  z-index: 1;
}
.v-sheet {
  width: 36rem;
  height: 50rem;
}
</style>

<script setup>
import MyCartOrder from "@/components/MyCartOrder.vue";
</script>

<script>
export default {
  data: () => ({
    scrollInvoked: 0,
    cart: [],
  }),
  methods: {
    onScroll() {
      this.scrollInvoked++;
    },
    AddtoOrder() {
      localStorage.setItem("Order", JSON.stringify(this.cart));
    },
  },
  created() {
    this.cart = JSON.parse(localStorage.getItem("Cart"));
    console.log(this.cart);
  },
  // หลังจากนั้นก็อัพเดท ตลอด
  mounted() {
    this.cart = JSON.parse(localStorage.getItem("Cart"));
  },
};
</script>
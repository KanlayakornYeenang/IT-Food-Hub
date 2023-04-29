<template >
  <div class="d-flex justify-center align-center;">
    <!-- <router-view :key="$route.fullPath" :baskets="baskets"></router-view> -->
    <CheckoutDetail :user="user" />
  </div>
</template>

<script setup>
import CheckoutDetail from "@/components/checkout/CheckoutDetail.vue"
</script>

<script>
export default {
  data() {
    return {
      cart: null,
    }
  },
  props: {
    user: {
      type: Object
    }
  }
}
</script>
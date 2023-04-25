<template >
    <div class="d-flex justify-center align-center;"
    >
        <router-view :key="$route.fullPath" :baskets="baskets"></router-view>
    </div>
</template>
<script setup>
import CheckoutDetail from "@/components/checkout/CheckoutDetail.vue"
</script>
<script>
export default {
  data() {
    return{
        baskets:JSON.parse(localStorage.getItem("basket")),
    }
  },
  computed:{
    modiftedmenu(){

    }
    
  }
}
</script>
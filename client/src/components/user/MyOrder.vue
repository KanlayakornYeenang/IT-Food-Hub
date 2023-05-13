<template>
    <div>
        <StatusTabs />
        <v-text-field class="mt-4 mb-8" hide-details prepend-inner-icon="mdi-magnify"
            placeholder="คุณสามารถค้นหาได้โดยระบุชื่อคนส่งอาหาร ชื่อร้านอาหาร หรือหมายเลขคำสั่งซื้อ"></v-text-field>
        <v-col class="px-0 py-0 my-4" v-for="order, order_index in orders" :key="order_index">
            <router-link :to="'/itfoodhub/user/myorder/'+order.order.order_id" style="text-decoration: none;">
                <OrderCard :order="order.order" :order_detail="order.order_detail" :delivery_person="order.delivery_person"/>
            </router-link>
        </v-col>
    </div>
</template>
  
<script setup>
import StatusTabs from "@/components/user/myorder/StatusTabs.vue"
import OrderCard from "@/components/user/myorder/OrderCard.vue"
import axios from "@/plugins/axios";
</script>
  
<script>
export default {
    data() {
        return {
            orders: null
        }
    },
    mounted() {
        axios.get("api/myOrder").then((res) => {
            console.log(res.data);
            this.orders = res.data
        })
    }
};
</script>
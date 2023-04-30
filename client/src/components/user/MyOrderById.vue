<template>
    <v-card v-if="order">
        <Banner :order="order"/>
        <div class="container mt-4">
            <div>
                <Breadcrumb :order="order" :showButton="true" />
                <v-divider></v-divider>
                <Timeline :order="order" />
                <v-divider></v-divider>
                <v-col cols="11" class="mx-auto pt-6">
                    <DeliveryInfo :user="user" :show="false" />
                </v-col>
                <v-col cols="11" class="mx-auto">
                    <v-sheet class="mb-3" v-for="item, index in restaurant" :key="index">
                        <RestaurantCart :restaurant="item" />
                    </v-sheet>
                </v-col>
                <v-col cols="11" class="mx-auto mb-6">
                    <OrderSummary :totalPrice="order.order_total_price" />
                </v-col>
            </div>
        </div>
    </v-card>
</template>

<script setup>
import DeliveryInfo from "../checkout/DeliveryInfo.vue";
import RestaurantCart from "../checkout/RestaurantCart.vue";
import OrderSummary from "../checkout/OrderSummary.vue";
import Banner from "./myorderbyid/Banner.vue";
import Breadcrumb from "./myorderbyid/Breadcrumb.vue";
import Timeline from "./myorderbyid/Timeline.vue";
</script>
  
<script>
import axios from "@/plugins/axios";

export default {
    data() {
        return {
            order: null,
            restaurant: null,
        }
    },
    props: {
        user: {
            type: Object
        }
    },
    computed: {
        status() {
            if (this.order.order_status == 0) {
                return "กำลังรอคนรับรายการ"
            }
            if (this.order.order_status == 1) {
                return "กำลังจัดเตรียมอาหาร"
            }
            if (this.order.order_status == 2) {
                return "กำลังไปจัดส่งอาหาร"
            }
            if (this.order.order_status == 3) {
                return "จัดส่งเรียบร้อย"
            }
            return "ยกเลิกรายการ"
        }
    },
    mounted() {
        const order_id = this.$route.path.split('/')[4]
        axios.get("api/myOrder/" + order_id).then((res) => {
            this.order = res.data.order
            this.restaurant = res.data.restaurant
        })
    }
};
</script>
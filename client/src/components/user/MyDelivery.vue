<template>
    <v-card v-if="order">
        <Banner :order="order" />
        <div class="container mt-4">
            <div>
                <Breadcrumb :order="order" />
                <v-divider></v-divider>
                <Timeline :order="order" />
                <v-divider></v-divider>
                <v-col cols="11" class="mx-auto pt-6">
                    <DeliveryInfo :user="customer" />
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
            customer: null,
        }
    },
    props: {
        user: {
            type: Object
        }
    },
    mounted() {
        axios.get("api/myDelivery").then((res) => {
            this.order = res.data.order
            this.restaurant = res.data.restaurant
            this.customer = res.data.customer
            this.customer = Object.assign(this.customer, { user_locat: this.order.order_dest })
        })
    }
};
</script>
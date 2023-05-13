<template>
    <div>
        <v-container fluid class="pa-0">
            <Header v-if="restaurant" :restaurant="restaurant" :categories="tabs" />
        </v-container>
        <v-container fluid class="pa-0 bg-grey-lighten-4">
            <v-divider></v-divider>
            <div class="py-5">
                <div class="d-flex justify-center align-center py-5" v-if="tab_click == 'คำสั่งซื้อ'">
                    <v-col cols="8">
                        <v-card class="w-100 mb-6" color="transparent" elevation="0">
                            <v-card-item class="pa-0">
                                <v-card-title>
                                    <p class="text-h4 fw-600">คำสั่งซื้อทั้งหมด</p>
                                </v-card-title>
                            </v-card-item>
                        </v-card>
                        <v-row class="py-2">
                            <v-col cols="12" sm="4" v-for="(order, i) in orders" :key="i">
                                <OrderCard :order="order.order" :menu="order.order_detail" :delivery_person="order.delivery_person"/>
                            </v-col>
                        </v-row>
                    </v-col>
                </div>

                <div class="d-flex justify-center align-center py-5" v-if="tab_click == 'ไว้ก่อน'">
                    <v-col cols="8">
                        <v-card class="w-100 mb-6" color="transparent" elevation="0">
                            <v-card-item class="pa-0">
                                <v-card-title>
                                    <p class="text-h3 fw-600">ไว้ก่อน</p>
                                </v-card-title>
                            </v-card-item>
                        </v-card>
                    </v-col>
                </div>
            </div>
        </v-container>
    </div>
</template>
  
<script setup>
import Header from "@/components/restaurant/Header.vue";
import OrderCard from "@/components/myrestaurant/OrderCard.vue";
</script>
  
<script>
import axios from "@/plugins/axios.js";
import eventbus from "@/plugins/eventBus";

export default {
    props: {
        user: {
            type: Object,
        },
    },
    data() {
        return {
            restaurant: null,
            categories: null,
            orders: null,
            tabs: [{ "menu_cat": "คำสั่งซื้อ" }, { "menu_cat": "แก้ไขร้านอาหาร" }],
            tab_click: "คำสั่งซื้อ",
        };
    },
    mounted() {
        // ร้านอาหารของ user
        axios
            .get("partner/myrestaurant")
            .then((res) => {
                this.restaurant = res.data.restaurant;
                this.categories = res.data.category
                this.orders = res.data.orders
            })
            .catch((err) => {
                console.log(err);
            });
        
        eventbus.on('updateCategory', tab => {
            this.tab_click = tab
        })
    },
};
</script>
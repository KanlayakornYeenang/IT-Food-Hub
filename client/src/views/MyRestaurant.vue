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
                            <v-col cols="12" sm="3" v-for="(item, i) in 6" :key="i">
                                <div>
                                    <!-- <v-hover v-slot="{ isHovering, props }">
                                        <v-card :elevation="isHovering ? 16 : 2" :class="{ 'on-hover': isHovering }"
                                            v-bind="props" rounded="lg" style="cursor: pointer;">
                                            <v-card elevation="0"><v-card-item>
                                                    <v-card-title>
                                                        <p class="fw-600 text-center">คำสั่งซื้อ #</p>
                                                    </v-card-title>
                                                </v-card-item></v-card>
                                            <v-card rounded="lg" color="#edf4ff" class="text-center mx-3 mb-3">
                                                <div class="py-5">
                                                    <p class="fw-600">เวลาที่ต้องจัดส่ง</p>
                                                    <p>2023-04-29 03:44:17</p>
                                                </div>
                                                <p class="pb-5" style="color:#2071e3">ยอมรับ</p>
                                            </v-card>
                                        </v-card>
                                    </v-hover> -->
                                    <v-card rounded="lg" style="cursor: pointer;">
                                        <v-card elevation="0"><v-card-item>
                                                <v-card-title>
                                                    <p class="fw-600 text-center">คำสั่งซื้อ #</p>
                                                </v-card-title>
                                            </v-card-item></v-card>
                                        <v-card rounded="lg" color="#edf4ff" class="text-center mx-3 mb-3">
                                            <div class="py-5">
                                                <p class="fw-600">เวลาที่ต้องจัดส่ง</p>
                                                <p>2023-04-29 03:44:17</p>
                                            </div>
                                            <p class="pb-5" style="color:#2071e3">ยอมรับ</p>
                                        </v-card>
                                    </v-card>
                                </div>
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
                        <!-- <v-row class="py-2">
                            <v-col cols="12" sm="3" v-for="(item, i) in category.menu" :key="i">
                                <MenuCard :restaurant_name="restaurant.rst_name" :menu="item" />
                            </v-col>
                        </v-row> -->
                    </v-col>
                </div>
            </div>
        </v-container>
    </div>
</template>
  
<script setup>
import Header from "@/components/restaurant/Header.vue";
import MenuCard from "@/components/restaurant/MenuCard.vue";
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
            tabs: [{ "menu_cat": "คำสั่งซื้อ" }, { "menu_cat": "ไว้ก่อน" }],
            tab_click: "คำสั่งซื้อ",
        };
    },
    mounted() {
        axios
            .get("partner/myrestaurant")
            .then((res) => {
                this.restaurant = res.data.restaurant;
                this.categories = res.data.category
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
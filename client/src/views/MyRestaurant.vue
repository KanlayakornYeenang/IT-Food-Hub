<template>
    <div>
        <v-container fluid class="pa-0">
            <Header v-if="restaurant" :restaurant="restaurant" :categories="tabs" :buttons="['เพิ่มเมนู']" />
        </v-container>
        <v-container fluid class="pa-0 bg-grey-lighten-4">
            <v-divider></v-divider>
            <div class="py-5">
                <div v-if="tab_click == 'คำสั่งซื้อ'" class="d-flex justify-center align-center py-5">
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
                                <OrderCard :order="order.order" :menu="order.order_detail"
                                    :delivery_person="order.delivery_person" />
                            </v-col>
                        </v-row>
                    </v-col>
                </div>
                <div v-else>
                    <div class="d-flex justify-center align-center py-5" v-for="category, category_index in categories"
          :key="category_index" :ref="category.menu_cat" :id="category.menu_cat">
          <v-col cols="8">
            <v-card class="w-100 mb-6" color="transparent" elevation="0">
              <v-card-item class="pa-0">
                <v-card-title>
                  <p class="text-h4 fw-600">{{ category.menu_cat }}</p>
                </v-card-title>
              </v-card-item>
            </v-card>
            <v-row class="py-2">
              <v-col cols="12" sm="3" v-for="(item, i) in category.menu" :key="i">
                <MenuCard :restaurant_name="restaurant.rst_name" :menu="item" :categories="categories" @deleteMenu="deleteMenu" actions="restaurant"/>
              </v-col>
            </v-row>
          </v-col>
        </div>
                </div>
                <v-dialog v-model="addMenu" scroll-strategy="none" width="750">
                    <AddMenu :categories="categories" />
                </v-dialog>
            </div>
        </v-container>
    </div>
</template>
  
<script setup>
import Header from "@/components/restaurant/Header.vue";
import OrderCard from "@/components/myrestaurant/OrderCard.vue";
import AddMenu from "@/components/myrestaurant/AddMenu.vue";
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
            orders: null,
            tabs: [{ "menu_cat": "คำสั่งซื้อ" }, { "menu_cat": "แก้ไขเมนู" }],
            tab_click: "คำสั่งซื้อ",
            addMenu: false,
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

        eventbus.on('updateButton', button => {
            if (button == "เพิ่มเมนู") {
                this.addMenu = true
            }
            else {
                this.addMenu = false
            }
        })
    },
};
</script>
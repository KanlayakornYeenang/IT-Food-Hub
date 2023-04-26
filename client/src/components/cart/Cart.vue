<template>
  <v-card color="#f7f7f7" rounded="lg">
    <v-card elevation="0" class="mb-2 pa-2">
      <div class="text-right mb-2">
        <v-btn color="transparent" icon @click="updateDialog" elevation="0"><v-icon>mdi-close</v-icon></v-btn>
      </div>
      <v-divider></v-divider>
      <v-card-items>
        <v-card-title class="mt-2 d-flex">
          <p class="text-h5 fw-600 text-center w-100">ตะกร้า</p>
        </v-card-title>
      </v-card-items>
    </v-card>
    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel v-for="restaurant in restaurants" :key="restaurant">
        <v-expansion-panel-title>
          <p class="text-h6 fw-600">{{ restaurant.rst_name }} (฿{{ restaurant.total_price }})</p>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <div class="pa-1" v-for="menu in restaurant.menus" :key="menu">
            <v-col cols="12" class="d-flex" v-for="item in menu.items" :key="item">
              <v-col cols="3" class="pa-0 d-flex align-center">
                <v-btn icon size="x-small"
                  @click="decreaseQuantity(menu, item)"><v-icon>mdi-minus</v-icon></v-btn>
                <p class="mx-3 fw-600 text-h6">{{ item.quantity }}</p>
                <v-btn icon size="x-small" @click="increaseQuantity(menu, item)"><v-icon>mdi-plus</v-icon></v-btn>
              </v-col>
              <v-col cols="7" class="pa-0 d-flex">
                <div class="mr-2">
                  <v-img :width="60" class="rounded-lg"
                    src="https://mtek3d.com/wp-content/uploads/2018/01/image-placeholder-500x500.jpg"></v-img>
                </div>
                <div>
                  <p> {{ menu.menu_name }}</p>
                  <v-card-subtitle class="pa-0">{{ item.item }}</v-card-subtitle>
                </div>
              </v-col>
              <v-col cols="2" class="pa-0">
                <p class="text-right text-h6 fw-600"> {{ item.total_price }}</p>
              </v-col>
            </v-col>
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>
import axios from "@/plugins/axios";
import { groupMenusByRestaurant } from "../../utils/groupMenusByRestaurant";
export default {
  data() {
    return {
      panel: [0, 1],
    };
  },
  props: {
    cart: {
      type: Array,
    },
  },
  methods: {
    updateDialog() {
      this.$emit("updateDialog", false);
    },
    decreaseQuantity(menu, item) {
      if (item.quantity > 0) {
        item.quantity--
      }
      axios.patch("api/updateQuantity", { cart_id: menu.cart_id, quantity: item.quantity })
        .then(() => {
          this.$emit('cartUpdated');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    increaseQuantity(menu, item) {
      item.quantity++
      axios.patch("api/updateQuantity", { cart_id: menu.cart_id, quantity: item.quantity })
        .then(() => {
          this.$emit('cartUpdated');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    restaurants() {
      return groupMenusByRestaurant(this.cart);
    },
  },
};
</script>
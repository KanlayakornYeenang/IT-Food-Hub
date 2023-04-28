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
    <v-expansion-panels class="mb-2" v-model="panel" multiple>
      <v-expansion-panel elevation="0" v-for="restaurant, i in cart" :key="i">
        <v-expansion-panel-title class="text-h6">
          <p>{{ restaurant.rst_name }}</p>
          <p class="fw-600 ml-2">(฿{{ getTotalPrice(restaurant.menu) }})</p>
        </v-expansion-panel-title>
        <v-expansion-panel-text class="pt-2 pb-2">
          <div class="pa-2" v-for="menu, menu_index in restaurant.menu" :key="menu_index">
            <v-col class="pa-0 px-5 d-flex" cols="12">
              <v-col cols="3" class="pa-0 pr-5 d-flex justify-space-between align-center">
                <v-btn @click="decrease(menu)" icon size="x-small"><v-icon>mdi-minus</v-icon></v-btn>
                <p class="text-h6 fw-600">{{ menu.quantity }}</p>
                <v-btn @click="increase(menu)" icon size="x-small"><v-icon>mdi-plus</v-icon></v-btn>
              </v-col>
              <v-col class="d-flex pa-0" cols="6">
                <div>
                  <v-img :width="60" class="rounded-lg"
                    src="https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="></v-img>
                </div>
                <div class="mx-3">
                  <p>{{ menu.menu_name }}</p>
                  <v-card-subtitle class="pa-0">
                    {{ menu.item }}
                  </v-card-subtitle>
                </div>
              </v-col>
              <v-col cols="3" class="pa-0 text-right">
                <p v-if="menu.quantity > 0" class="text-h6 fw-600">{{ menu.price * menu.quantity }}</p>
                <v-btn v-else @click="deleteMenu(restaurant, menu, menu_index)" prepend-icon="mdi-trash-can-outline"
                  color="error">ลบรายการ</v-btn>
              </v-col>
            </v-col>
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-card elevation="0" class="mb-2 pa-2">
      <v-card-items>
        <v-card-title class="d-flex justify-space-between text-h5 fw-600">
          <p>รวมทั้งหมด</p>
          <p>฿50</p>
        </v-card-title>
        <div class="w-100 pt-2 px-2 d-flex justify-center">
          <v-btn size="x-large" class="w-100" color="success">สั่งซื้อ</v-btn>
        </div>
      </v-card-items>
    </v-card>
  </v-card>
</template>

<script>
import axios from "@/plugins/axios";
export default {
  data() {
    return {
      panel: [0, 1],
      cart: null,
      cancle: [],
    };
  },
  methods: {
    deleteMenu(restaurant, menu, menu_index) {
      restaurant.menu.splice(menu_index, 1)
      this.cancle.push(menu.cart_id)
      axios.delete("api/deleteMenu", { cart_id: menu.cart_id })
    },
    updateDialog() {
      this.$emit("updateDialog", false);
      this.$emit("updateCancle", this.cancle);
    },
    refreshCart() {
      axios
        .get('api/cart')
        .then((res) => {
          this.cart = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    decrease(menu) {
      if (menu.quantity > 0) {
        menu.quantity--
      }
      axios.patch("api/updateQuantity", { cart_id: menu.cart_id, quantity: menu.quantity })
      this.$emit("updateCart", this.cart);
    },
    increase(menu) {
      menu.quantity++
      axios.patch("api/updateQuantity", { cart_id: menu.cart_id, quantity: menu.quantity })
      this.$emit("updateCart", this.cart);
    },
    getTotalPrice(menus) {
      let totalPrice = 0;
      menus.forEach(menu => {
        const price = parseFloat(menu.price);
        const quantity = parseInt(menu.quantity);
        totalPrice += price * quantity;
      });
      return totalPrice;
    }
  },
  mounted() {
    this.refreshCart()
  }
};
</script>
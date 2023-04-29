<template>
  <v-card color="#f7f7f7" rounded="lg" style="min-height: 80vh;">

      <v-card elevation="0" class="fixed-card-top mb-2 pa-2 w-100">
        <div class="text-right mb-2">
          <v-btn color="transparent" icon @click="updateDialog" elevation="0"><v-icon>mdi-close</v-icon></v-btn>
        </div>
        <v-divider></v-divider>
        <v-card-items v-if="cart && cart.length > 0">
          <v-card-title class="mt-2 d-flex">
            <p class="text-h5 fw-600 text-center w-100">ตะกร้า</p>
          </v-card-title>
        </v-card-items>
      </v-card>

      <div class="expansion-panels-container" v-if="cart && cart.length > 0">
        <v-expansion-panels variant="accordion" multiple>
      <v-expansion-panel elevation="0" v-for="restaurant, rst_index in cart" :key="rst_index">
        <v-expansion-panel-title class="text-h6">
          <p>{{ restaurant.rst_name }}</p>
          <v-card-subtitle class="fw-600 ml-2 pa-0">({{ getRestaurantQuantity(restaurant) }} รายการ) (฿{{ getRestaurantPrice(restaurant) }})</v-card-subtitle>
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
                <v-btn v-else @click="deleteMenu(restaurant, rst_index, menu, menu_index)"
                  prepend-icon="mdi-trash-can-outline" color="error">ลบรายการ</v-btn>
              </v-col>
            </v-col>
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
      </div>

    <div v-if="cart && cart.length > 0" class="w-100">
      <v-card elevation="0" class="fixed-card-bottom pa-2 pb-4">
        <v-card-items>
          <v-card-title class="d-flex justify-space-between text-h5 fw-600">
            <p>รวมค่าอาหาร</p>
            <p>฿{{ getTotalPrice() }}</p>
          </v-card-title>
          <div class="w-100 pt-2 px-2 d-flex justify-center">
            <v-btn size="x-large" class="w-100" color="success" @click="goCheckout()">สั่งซื้อ</v-btn>
          </div>
        </v-card-items>
      </v-card>
    </div>
    <div v-else class="text-center my-auto" style="margin-top: 75px;">
      <p class="text-h5">เริ่มเลือกอาหารกันเถอะ!</p>
      <p class="text-grey">เพิ่มสินค้าในตะกร้าและสั่งซื้อที่นี่ได้เลย</p>
      <v-hover>
        <template v-slot:default="{ isHovering, props }">
          <v-card @click="updateDialog" elevation="0" class="my-10 mx-auto" v-bind="props"
            style="cursor: pointer; width: fit-content;" :color="isHovering ? 'it' : undefined">
            <v-card-text class="px-5 py-2">Continue browsing</v-card-text></v-card>
        </template>
      </v-hover>
      <v-img class="mx-auto" :width="200" src="@/assets/foodtray.png"></v-img>
    </div>
  </v-card>
</template>

<style scoped>
.fixed-card-top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.fixed-card-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.expansion-panels-container {
  margin-top: 136px;
  height: 560px;
  overflow-y: auto;
}
</style>

<script>
import axios from "@/plugins/axios";
export default {
  data() {
    return {
      cart: null,
      cancle: [],
    };
  },
  methods: {
    goCheckout() {
      this.updateDialog()
      this.$router.push('/itfoodhub/checkout');
    },
    deleteMenu(restaurant, rst_index, menu, menu_index) {
      axios.delete("api/deleteMenu", { params: { cart_id: menu.cart_id } })
      restaurant.menu.splice(menu_index, 1)
      if (restaurant.menu.length == 0) {
        this.cart.splice(rst_index, 1)
      }
      this.cancle.push(menu.cart_id)
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
    getRestaurantPrice(restaurant) {
      let totalPrice = 0;
      restaurant.menu.forEach(menu => {
        const price = parseFloat(menu.price);
        const quantity = parseInt(menu.quantity);
        totalPrice += price * quantity;
      })
      return totalPrice;
    },
    getTotalPrice() {
      let totalPrice = 0;
      if (this.cart) {
        this.cart.forEach((restaurant) => {
          restaurant.menu.forEach((menu) => {
            const price = parseFloat(menu.price);
            const quantity = menu.quantity;
            const subtotal = price * quantity;
            totalPrice += subtotal;
          });
        });
      }
      return totalPrice
    },
    getRestaurantQuantity(restaurant) {
      let quantity = 0
      for (let i = 0; i < restaurant.menu.length; i++) {
        quantity += restaurant.menu[i].quantity
      }
      return quantity
    }
  },
  mounted() {
    this.refreshCart()
  }
};
</script>
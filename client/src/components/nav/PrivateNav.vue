<template>
  <v-app-bar v-if="user" color="it" height="145" elevation="2">
    <v-col cols="8" class="d-flex flex-column mx-auto">
      <div class="d-flex justify-space-between my-2">
        <div>
          <v-btn size="small">
            <p class="text-body-1 fw-600">สมัครเป็นพาร์ทเนอร์ร้านอาหาร</p>
          </v-btn>
          <v-btn size="small" to="/itfoodhub/pickorder">
            <p class="text-body-1 fw-600">รับออเดอร์ส่งอาหาร</p>
          </v-btn>
        </div>
        <div>
          <v-btn size="small" prepend-icon="mdi-chat-processing">
            <p class="text-body-1 fw-600">ข้อความ</p>
          </v-btn>
          <v-btn size="small" prepend-icon="mdi-receipt-text" to="/itfoodhub/user/myorder">
            <p class="text-body-1 fw-600">รายการสั่งซื้อ</p>
          </v-btn>
          <v-btn size="small" prepend-icon="mdi-bell">
            <p class="text-body-1 fw-600">การแจ้งเตือน</p>
          </v-btn>
          <v-menu open-on-hover>
            <template v-slot:activator="{ props }">
              <v-btn size="small" prepend-icon="mdi-account-circle" id="menu-activator" v-bind="props">
                <p class="text-body-1 fw-600">{{ user.user_fname }}</p>
              </v-btn>
            </template>
            <div style="
                                        background-color: white;
                                        border-top-right-radius: 5px;
                                        border-top-left-radius: 5px;
                                      ">
              <v-btn variant="plain" :to="'/itfoodhub/user'">
                บัญชีของฉัน
              </v-btn>
            </div>
            <div style="
                                        background-color: white;
                                        border-bottom-right-radius: 5px;
                                        border-bottom-left-radius: 5px;
                                      ">
              <v-btn variant="plain"> ออกจากระบบ </v-btn>
            </div>
          </v-menu>
        </div>
      </div>
      <div class="d-flex justify-space-between align-end my-2">
        <v-sheet color="transparent" class="mr-10 ml-7 d-flex align-center">
          <v-sheet color="transparent">
            <router-link to="/itfoodhub"><v-img :width="125" src="@/assets/logo-white.png"></v-img></router-link>
          </v-sheet>
          <v-divider v-if="path == 'checkout'" vertical class="border-opacity-100 mx-5" color="white"></v-divider>
          <p v-if="path == 'checkout'" class="fw-600 text-h6">Checkout</p>
        </v-sheet>
        <v-text-field v-if="path !== 'checkout'" placeholder="Search IT FOOD HUB" variant="solo" hide-details
          append-inner-icon="mdi-magnify"></v-text-field>
        <v-btn v-if="path !== 'checkout'" icon class="mx-10" @click="updateDialog(true)">
          <v-badge color="foodhub" v-if="cart" :content="cartLength">
            <v-icon size="x-large">mdi-shopping</v-icon>
          </v-badge>
        </v-btn>
      </div>

      <v-dialog v-model="dialog" width="600" scroll-strategy="close">
        <Cart @updateDialog="updateDialog" @updateCart="updateCart" @updateCancle="updateCancle" />
      </v-dialog>
    </v-col>
  </v-app-bar>
</template>

<script setup>
import Cart from "@/components/cart/Cart.vue";
</script>

<script>
import eventbus from "@/plugins/eventBus";
import axios from "@/plugins/axios.js";
export default {
  data() {
    return {
      dialog: false,
      cart: null,
      cancle: [],
    };
  },
  props: {
    user: {
      type: Object,
    },
  },
  methods: {
    updateCart(cart) {
      this.cart = cart;
    },
    updateDialog(dialog) {
      for (let i = 0; i < this.cart.length; i++) {
        for (let j = 0; j < this.cart[i].menu.length; j++) {
          let menu = this.cart[i].menu[j]
          if (parseFloat(menu.quantity) == 0 && !this.cancle.includes(menu.cart_id)) {
            menu.quantity++
            axios.patch("api/updateQuantity", { cart_id: menu.cart_id, quantity: menu.quantity })
          }
        }
      }
      this.dialog = dialog;
    },
    updateCancle(cancle) {
      this.cancle = cancle
    }
  },
  computed: {
    cartLength() {
      let length = 0;
      for (let i = 0; i < this.cart.length; i++) {
        for (let j = 0; j < this.cart[i].menu.length; j++) {
          length += this.cart[i].menu[j].quantity
        }
      }
      return length
    },
    path() {
      return this.$route.path.split("/")[2]
    }
  },
  mounted() {
    axios
      .get('api/cart')
      .then((res) => {
        this.cart = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    eventbus.on('update-cart', cart => {
      this.cart = cart
    })
    // eventbus.on('update-dialog', dialog => {
    //   setTimeout(() => {
    //     this.dialog = dialog;
    //   }, 1500);
    // })
  }
};
</script>
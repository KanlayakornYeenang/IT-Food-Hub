<template>
  <div>
    <v-app-bar v-if="user" color="it" height="145" elevation="2" style="z-index:1">
      <v-col cols="8" class="d-flex flex-column mx-auto">
        <div class="d-flex justify-space-between my-2">
          <div>
            <router-link  v-if="user.user_role != 'restaurant'"  style="text-decoration: none; color: inherit;" to="/itfoodhub/merchant">
            <v-btn size="small">
              <p class="text-body-1 fw-600">สมัครเป็นพาร์ทเนอร์ร้านอาหาร</p>
            </v-btn>
            </router-link>
            <router-link v-else to="/itfoodhub/myrestaurant" style="text-decoration: none; color: inherit;">
              <v-btn size="small">
                <p class="text-body-1 fw-600">ไปยังร้านอาหารของฉัน</p>
              </v-btn>
            </router-link>
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
            <v-btn size="small" prepend-icon="mdi-bell" @click="openDrawer">
              <p class="text-body-1 fw-600">การแจ้งเตือน</p>
              <v-icon v-if="noti == '1'" icon="mdi-exclamation-thick"></v-icon>
            </v-btn>

            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" size="small" prepend-icon="mdi-account-circle" id="menu-activator">
                  <p class="text-body-1 fw-600">{{ user.user_fname }}</p>
                </v-btn>
              </template>

              <v-list>
                <v-list-item density="compact" @click="this.$router.push('/itfoodhub/user')">
                    <div>
                    <p class="th-b text-body-1 fw-600">
                      บัญชีของฉัน
                    </p>
                  </div>
                </v-list-item>
                <v-list-item density="compact" @click="logOut">
                  <div>
                    <p class="th-b text-body-1 fw-600 text-red">
                      ออกจากระบบ
                    </p>
                  </div>
                </v-list-item>
              </v-list>
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
            append-inner-icon="mdi-magnify" v-model="searchText"></v-text-field>
          <v-btn v-if="path !== 'checkout'" icon class="mx-10" @click="updateDialog(true)">
            <v-badge color="foodhub" v-if="cart" :content="cartLength">
              <v-icon size="x-large">mdi-shopping</v-icon>
            </v-badge>
          </v-btn>
        </div>

        <v-dialog v-model="dialog" width="600" scroll-strategy="close">
          <Cart @updateDialog="updateDialog" @updateCart="updateCart" @updateCancel="updateCancel" />
        </v-dialog>
      </v-col>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" temporary location="right" style="top: 0; min-height: 100vh;">
      <ItemNoti :user="user"></ItemNoti>
    </v-navigation-drawer>
  </div>
</template>

<script setup>
import Cart from "@/components/cart/Cart.vue";
import ItemNoti from "@/components/notification/ItemNoti.vue"
</script>

<script>
import io from 'socket.io-client';
import eventbus from "@/plugins/eventBus";
import axios from "@/plugins/axios.js";
import { toHandlers } from "vue";

export default {
  data() {
    return {
      dialog: false,
      cart: null,
      cancel: [],
      drawer: null,
      noti: null,
      searchText: '', 
      
    };
  },
  props: {
    user: {
      type: Object,
    },
  },
  methods: {
    openDrawer() {
      this.drawer = !this.drawer;
      this.noti = "0"
    },
    updateCart(cart) {
      this.cart = cart;
    },
    updateDialog(dialog) {
      for (let i = 0; i < this.cart.length; i++) {
        for (let j = 0; j < this.cart[i].menu.length; j++) {
          let menu = this.cart[i].menu[j]
          if (parseFloat(menu.quantity) == 0 && !this.cancel.includes(menu.cart_id)) {
            menu.quantity++
            axios.patch("api/updateQuantity", { cart_id: menu.cart_id, quantity: menu.quantity })
          }
        }
      }
      this.dialog = dialog;
    },
    updateCancel(cancel) {
      this.cancel = cancel
    },
    logOut() {
      localStorage.removeItem('token')
      this.$router.push('/')
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
    this.noti = localStorage.getItem("noti")
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
    this.socket = io('http://localhost:4114'); // Replace with your socket server URL
    // Listen for the 'notification_updated' event
    this.socket.on('notification_updated', ({ getNoti, cus_id }) => {
      if (cus_id == this.user.user_id) {
        this.noti = localStorage.getItem('noti')
      }
    })
  },
  watch: {
    searchText(newValue) {
      this.$emit('search-text-changed', newValue);
    },
  },

};
</script>
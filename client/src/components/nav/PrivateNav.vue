<template>
  <v-app-bar color="it" height="145" elevation="2">
    <v-col cols="8" class="d-flex flex-column mx-auto">
      <div class="d-flex justify-space-between my-2">
        <div>
          <v-btn size="small">
            <p class="text-body-1 fw-600">สมัครเป็นพาร์ทเนอร์ร้านอาหาร</p>
          </v-btn>
          <v-btn size="small">
            <p class="text-body-1 fw-600">สมัครเป็นคนส่งอาหาร</p>
          </v-btn>
        </div>
        <div>
          <v-btn size="small" prepend-icon="mdi-chat-processing">
            <p class="text-body-1 fw-600">ข้อความ</p>
          </v-btn>
          <v-btn size="small" prepend-icon="mdi-receipt-text">
            <p class="text-body-1 fw-600">รายการสั่งซื้อ</p>
          </v-btn>
          <v-btn size="small" prepend-icon="mdi-bell">
            <p class="text-body-1 fw-600">การแจ้งเตือน</p>
          </v-btn>
          <v-menu open-on-hover>
            <template v-slot:activator="{ props }">
              <v-btn v-if="user" size="small" prepend-icon="mdi-account" id="menu-activator" v-bind="props">
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
        <v-sheet color="transparent" class="mr-10 ml-7">
          <v-img :width="125" src="@/assets/logo-white.png"></v-img>
        </v-sheet>
        <v-text-field placeholder="Search IT FOOD HUB" variant="solo" hide-details
          append-inner-icon="mdi-magnify"></v-text-field>
        <v-btn icon class="mx-10" @click="dialog = true">
          <v-badge color="foodhub" v-if="cart" :content="cart.length">
            <v-icon size="x-large">mdi-shopping</v-icon>
          </v-badge>
        </v-btn>
      </div>

      <v-dialog v-model="dialog" width="600" scroll-strategy="close">
        <Cart :cart="cart" @updateDialog="updateDialog" />
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
    };
  },
  props: {
    user: {
      type: Object,
    },
  },
  methods: {
    updateDialog(dialog) {
      this.dialog = dialog;
    },
  },
  computed: {
    //
  },
  mounted() {
    axios
      .get('api/cart')
      .then((res) => {
        this.cart = res.data
      })
      .catch((err) => {
        console.log(err);
        this.$router.push("/");
      });
      eventbus.on('update-cart', (cart) => {
        this.cart = cart
      })
  }
};
</script>
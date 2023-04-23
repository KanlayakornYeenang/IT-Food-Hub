<template>
  <v-card color="#f7f7f7" rounded="lg">
    <v-card elevation="0" class="mb-2 pa-2">
      <div class="text-right mb-2">
        <v-btn color="transparent" icon @click="updateDialog" elevation="0"
          ><v-icon>mdi-close</v-icon></v-btn
        >
      </div>
      <v-divider></v-divider>
      <v-card-items>
        <v-card-title class="mt-2 d-flex justify-space-between">
          <p class="text-h5 fw-600">{{ menu.menu_name }}</p>
          <p class="text-h5 fw-600">{{ menu.menu_price }}</p>
        </v-card-title>
      </v-card-items>
    </v-card>
    <v-card
      elevation="0"
      class="mb-2 pa-2 pr-6"
      v-for="(option, i) in options"
      :key="i"
    >
      <v-card-items>
        <div class="d-flex align-center">
          <v-card-title class="d-flex">
            <p>{{ option.option_name }}</p>
            <p v-if="option.option_type == 'require'" class="mx-1 text-red">
              *
            </p></v-card-title
          ><v-card-subtitle class="pa-0 pt-1 d-flex"
            ><p v-if="option.option_type == 'require'">ต้องเลือก</p>
            <p v-else>เลือกได้สูงสุด</p>
            <p class="mx-1">{{ option.max_optional }}</p></v-card-subtitle
          >
        </div>
        <v-card-text class="pr-0 pl-2 py-0">
          <div
            v-if="
              (option.option_type == 'optional' && option.max_optional == 1) ||
              option.max_optional > 1
            "
          >
            <Checkbox
              :option_name="option.option_name"
              :option="option.item"
              @update-checkbox="update"
            />
          </div>
          <div v-else>
            <Radio
              :option_name="option.option_name"
              :option="option.item"
              @update-radio="update"
            />
          </div>
        </v-card-text>
      </v-card-items>
    </v-card>
    <v-card elevation="0">
      <div class="d-flex align-center">
        <v-card-title> หมายเหตุถึงร้านอาหาร </v-card-title
        ><v-card-subtitle class="pa-0 pt-1">ไม่จำเป็นต้องระบุ</v-card-subtitle>
      </div>
      <v-text-field
        class="mx-5 mb-5"
        hide-details
        variant="outlined"
        placeholder="ระบุรายละเอียดคำขอ (ขึ้นอยู่กับดุลยพินิจของร้าน)"
      ></v-text-field>
      <v-divider></v-divider>
      <v-card-items>
        <v-card-actions class="ma-5">
          <v-col
            cols="4"
            class="pa-0 pr-4 d-flex align-center justify-space-between"
          >
            <v-btn
              elevation="2"
              size="small"
              color="it"
              icon
              @click="decrement()"
              ><v-icon>mdi-minus</v-icon></v-btn
            >
            <p class="text-center text-h5 fw-600">
              {{ quantity }}
            </p>
            <v-btn
              elevation="2"
              size="small"
              color="it"
              icon
              @click="quantity++"
              ><v-icon>mdi-plus</v-icon></v-btn
            >
          </v-col>
          <v-col cols="8" class="pa-0">
            <v-btn @click="addToBasket" class="bg-success w-100" size="x-large"
              >เพิ่มใส่ตะกร้า - 0.00</v-btn
            >
          </v-col></v-card-actions
        >
      </v-card-items>
    </v-card>
  </v-card>
</template>

<script setup>
import Checkbox from "@/components/restaurant/menuDialog/Checkbox.vue";
import Radio from "@/components/restaurant/menuDialog/Radio.vue";
</script>

<script>
import axios from "@/plugins/axios.js";
import eventBus from "@/eventBus";

export default {
  data() {
    return {
      options: null,
      selected: {},
      quantity: 1,
      orders: {
        rst_id: this.menu.rst_id,
        rst_name: this.restaurant_name,
        menu: [],
      },
      order: {},
      basket: null,
    };
  },
  props: {
    restaurant_name: {
      type: String,
    },
    menu: {
      type: Object,
    },
  },
  methods: {
    update(selected) {
      Object.assign(this.selected, selected);
    },
    updateDialog() {
      this.$emit("updateDialog", false);
    },
    decrement() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    addToBasket() {
      this.basket = JSON.parse(localStorage.getItem("basket"));
      let existed = false; // ตัวแปรสำหรับเก็บว่ามีเมนูนี้อยู่ในตะกร้าแล้วหรือไม่
      this.basket.basket.forEach((orders) => {
        // ตรวจสอบว่าเมนูนี้อยู่ในร้านอาหารเดียวกันหรือไม่
        if (orders.rst_id === this.menu.rst_id) {
          orders.menu.forEach((order) => {
            if (
              order.menu_name === this.menu.menu_name &&
              this.isEqual(order.option, this.selected)
            ) {
              // ถ้ามีเมนูนี้อยู่แล้ว ให้บวกเพิ่มใน quantity
              order.quantity += this.quantity;
              existed = true;
            }
          });
          // ถ้าไม่มีเมนูนี้อยู่ให้ push เมนูใหม่เข้าไปใน array menu ของร้านอาหารนี้
          if (!existed) {
            this.createOrder();
            orders.menu.push(this.orders.menu[0]);
            existed = true;
          }
        }
      });
      // ถ้าไม่มีเมนูนี้อยู่ในตะกร้าให้เพิ่มเมนูใหม่เข้าไปในตะกร้า
      if (!existed) {
        this.createOrder();
        this.basket.basket.push(this.orders);
      }
      // บันทึกตะกร้าสินค้าลงใน localStorage
      localStorage.setItem("basket", JSON.stringify(this.basket));
      eventBus.emit("add-to-basket", this.basket);
    },
    isEqual(obj1, obj2) {
      return JSON.stringify({ ...obj1 }) === JSON.stringify({ ...obj2 });
    },
    createOrder() {
      for (var key in this.selected) {
        if (this.selected[key].length === 0) {
          delete this.selected[key];
        }
      }
      this.order = {
        menu_name: this.menu.menu_name,
        menu_price: this.menu.menu_price,
        option: this.selected,
        quantity: this.quantity,
      };
      this.orders.menu.push(this.order);
    },
  },
  mounted() {
    axios
      .get(this.$route.path + "/" + this.menu.menu_id)
      .then((res) => {
        this.options = res.data;
        this.options.map((option) => {
          Object.assign(this.selected, { [option.option_name]: [] });
        });
      })
      .catch((err) => {
        this.$router.push("/");
      });
  },
};
</script>
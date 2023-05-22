<template>
  <v-card color="#f7f7f7" rounded="lg">
    <v-card elevation="0" class="mb-2 pa-2">
      <div class="text-right mb-2">
        <v-btn color="transparent" icon @click="updateDialog" elevation="0"><v-icon>mdi-close</v-icon></v-btn>
      </div>
      <v-divider></v-divider>
      <v-card-items>
        <v-card-title class="mt-2 d-flex justify-space-between">
          <p class="text-h5 fw-600">{{ menu.menu_name }}</p>
          <p class="text-h5 fw-600">{{ parseFloat(menu.menu_price) }}</p>
        </v-card-title>
      </v-card-items>
    </v-card>
    <v-card elevation="0" class="mb-2 pa-2 pr-6" v-for="(option, i) in options" :key="i">
      <v-card-items>
        <div class="d-flex align-center">
          <v-card-title class="d-flex">
            <p>{{ option.option_name }}</p>
            <p v-if="option.option_type == 1" class="mx-1 text-red">
              *
            </p>
          </v-card-title><v-card-subtitle class="pa-0 pt-1 d-flex">
            <p v-if="option.option_type == 1">เลือก</p>
            <p v-if="option.max_optional == 1" class="mx-1">1</p>
          </v-card-subtitle>
        </div>
        <v-card-text class="pr-0 pl-2 py-0">
          <div v-if="(option.option_type == 1) && option.max_optional == 1">
            <Radio :option_id="option.option_id" :option="option.item" @update-radio="update" />
          </div>
          <div v-else>
            <Checkbox :option_id="option.option_id" :option="option.item" @update-checkbox="update" />
          </div>
        </v-card-text>
      </v-card-items>
    </v-card>
    <v-card elevation="0">
      <!-- <div class="d-flex align-center">
        <v-card-title> หมายเหตุถึงร้านอาหาร </v-card-title><v-card-subtitle
          class="pa-0 pt-1">ไม่จำเป็นต้องระบุ</v-card-subtitle>
      </div>
      <v-text-field class="mx-5 mb-5" hide-details variant="outlined"
        placeholder="ระบุรายละเอียดคำขอ (ขึ้นอยู่กับดุลยพินิจของร้าน)"></v-text-field>
      <v-divider></v-divider> -->
      <v-card-items>
        <v-card-actions class="ma-5">
          <v-col cols="4" class="pa-0 pr-4 d-flex align-center justify-space-between">
            <v-btn elevation="2" size="small" color="it" icon @click="decrement()"><v-icon>mdi-minus</v-icon></v-btn>
            <p class="text-center text-h5 fw-600">
              {{ quantity }}
            </p>
            <v-btn elevation="2" size="small" color="it" icon @click="quantity++"><v-icon>mdi-plus</v-icon></v-btn>
          </v-col>
          <v-col cols="8" class="pa-0">
            <v-btn @click="addToCart" class="bg-success w-100" size="x-large">เพิ่มใส่ตะกร้า - {{ totalPrice }}</v-btn>
          </v-col></v-card-actions>
      </v-card-items>
    </v-card>
  </v-card>
</template>

<script setup>
import Checkbox from "@/components/restaurant/menuDialog/Checkbox.vue";
import Radio from "@/components/restaurant/menuDialog/Radio.vue";
</script>

<script>
import eventbus from "@/plugins/eventBus";
import axios from "@/plugins/axios.js";
export default {
  data() {
    return {
      options: null,
      selected: {},
      quantity: 1,
    };
  },
  props: {
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
    async addToCart() {
      try {
        const allItemIds = Object.values(this.selected)
          .flat()
          .map((item) => item.item_id)
          .sort();
        const item_id = allItemIds.join().replace(/\[|\]/g, '');
        const order = {
          menu_id: this.menu.menu_id,
          quantity: this.quantity,
          item_id: item_id,
        };
        await axios.post('api/addToCart', order);
        const res = await axios.get('api/cart');
        eventbus.emit('update-cart', res.data);
        this.updateDialog();
      } catch (err) {
        console.log(err);
        this.$router.push('/');
      }
    }
  },
  computed: {
    totalPrice() {
      let totalPriceOption = 0;
      for (const key in this.selected) {
        const itemsArr = this.selected[key];
        for (const item of itemsArr) {
          totalPriceOption += parseFloat(item.item_price);
        }
      }
      return (parseFloat(this.menu.menu_price) + totalPriceOption) * this.quantity
    }
  },
  mounted() {
    axios
      .get(this.$route.path + "/" + this.menu.menu_id)
      .then((res) => {
        this.options = res.data;
      })
      .catch((err) => {
        this.$router.push("/");
      });
  },
};
</script>
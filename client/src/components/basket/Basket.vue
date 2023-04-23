<template>
  <v-card color="#f7f7f7" rounded="lg">
    <v-card elevation="0" class="mb-2 pa-2">
      <div class="text-right mb-2">
        <v-btn color="transparent" icon @click="this.$emit('updateDialog', false)"
          elevation="0"><v-icon>mdi-close</v-icon></v-btn>
      </div>
      <v-divider></v-divider>
      <v-card-items>
        <v-card-title class="mt-2">
          <p class="text-h5 fw-600 text-center">ตะกร้า</p>
        </v-card-title>
      </v-card-items>
    </v-card>
    <v-card elevation="0" class="mb-2 pa-2" v-for="(restaurants, i) in basket" :key="i">
      <v-card-items :key="i">
        <v-expansion-panels multiple v-model="panel" class="pa-2">
          <v-expansion-panel class="my-3" v-for="(restaurant, restaurant_index) in restaurants" :key="restaurant_index">
            <v-expansion-panel-title class="bg-itlight">
              <p class="text-h5 fw-600">{{ restaurant.rst_name }}</p>
            </v-expansion-panel-title>
            <div class="d-flex flex-column px-6">
              <v-expansion-panel-text class="py-3">
                <div class="d-flex flex-column" style="row-gap:1.15vh">
                  <v-col class="d-flex pa-0" cols="12" v-for="(menu, menu_index) in restaurant.menu" :key="menu_index">
                  <v-col class="d-flex pa-0 justify-space-between align-center" cols="2">
                    <v-btn class="text-it" icon size="x-small"
                      @click="handleMenuQuantity('decrease', menu, menu_index, restaurant_index)"><v-icon>mdi-minus</v-icon></v-btn>
                    <p>{{ menu.quantity }}</p>
                    <v-btn class="text-it" icon size="x-small"
                      @click="handleMenuQuantity('increase', menu, menu_index, restaurant_index)"><v-icon>mdi-plus</v-icon></v-btn>
                  </v-col>
                  <v-col cols="8" class="d-flex pa-0 px-2">
                    <div>
                      <v-img :width="80" class="rounded-lg"
                        src="https://mtek3d.com/wp-content/uploads/2018/01/image-placeholder-500x500.jpg">
                      </v-img>
                    </div>
                    <div class="px-2">
                      <p>{{ menu.menu_name }}</p>
                      <div class="d-flex">
                        <div v-for="option, i in menu.option" :key="i" class="d-flex">
                          <v-card-subtitle class="pa-0 pr-1" v-for="item, i in option" :key="i">{{ item.split(' ')[0]
                          }}</v-card-subtitle>
                        </div>
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="2" class="pa-0 text-right">
                    <p v-if="menu.quantity > 0" class="text-h6 fw-600">{{ calculateMenuTotal(menu) }}</p>
                    <v-btn v-else>ลบรายการ</v-btn>
                  </v-col>
                </v-col>
                </div>
              </v-expansion-panel-text>
            </div>
            <v-divider></v-divider>
            <v-col class="py-2 px-6 d-flex justify-space-between text-h5" cols="12"><p>รวมทั้งหมด</p><p class="fw-600">{{ calculateTotalPriceRestaurant(restaurant.menu) }}</p></v-col>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-card-text class="pr-0 pl-2 py-0"> </v-card-text>
      </v-card-items>
    </v-card>

    <v-card elevation="0">
      <v-card-items>
        <v-card-actions class="d-flex flex-column ma-5">
          <div>
            <p>รวมทั้งหมด </p>
          </div>
          <v-btn class="bg-success w-100" size="x-large">ตรวจสอบรายการ</v-btn>
        </v-card-actions>
      </v-card-items>
    </v-card>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      panel: [0, 1],
    };
  },
  props: {
    basket: {
      type: Object,
    },
  },
  methods: {
    calculateTotalPriceRestaurant(restaurant) { // ยอดรวมของ 1 ร้าน
      let totalPrice = 0
      for (let i = 0; i < restaurant.length; i++) {
        let menu = restaurant[i]
        let menuTotal = this.calculateMenuTotal(menu)
        totalPrice += menuTotal
      }
      return totalPrice
    },
    calculateMenuTotal(menu) { // ยอดรวมของ 1 เมนู
      let totalPrice = parseFloat(menu.menu_price);
      for (let option in menu.option) {
        if (menu.option.hasOwnProperty(option)) {
          let selectedOption = menu.option[option][0];
          totalPrice += parseFloat(selectedOption.split(" ")[1]);
        }
      }
      return totalPrice * menu.quantity;
    },
    handleMenuQuantity(type, menu, menu_index, restaurant_index) {
      if (type === 'increase') {
        menu.quantity++;
      }
      else {
        if (menu.quantity > 0) {
          menu.quantity--;
        }
      }
      this.$forceUpdate(); // force re-render to update the total price
      this.basket['basket'][restaurant_index].menu[menu_index].quantity = menu.quantity
      localStorage.setItem('basket', JSON.stringify(this.basket));
    },
  }
};
</script>
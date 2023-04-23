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
    <v-card elevation="0" class="mb-2 pa-2 pr-6" v-for="(restaurants, i) in basket" :key="i">
      <v-card-items :key="i">
        <v-expansion-panels>
          <v-expansion-panel v-for="(restaurant, i) in restaurants" :key="i">
            <v-expansion-panel-title expand-icon="mdi-menu-down">
              <p class="text-h5 fw-600">{{ restaurant.rst_name }}</p>
            </v-expansion-panel-title>
            <v-expansion-panel-text v-for="(menu, i) in restaurant.menu" :key="i">
              <v-col class="pa-0 d-flex" cols="12">
                <v-col class="pa-0 bg-red d-flex justify-space-between align-center" cols="2">
                  <v-btn icon size="x-small"><v-icon size="x-small">mdi-minus</v-icon></v-btn>
                  <p>{{ menu.quantity }}</p>
                  <v-btn icon size="x-small"><v-icon size="x-small">mdi-plus</v-icon></v-btn>
                </v-col>
                <v-col cols="8" class="d-flex">
                  <div>
                    <v-img :width="80" class="rounded-lg"
                      src="https://mtek3d.com/wp-content/uploads/2018/01/image-placeholder-500x500.jpg">
                    </v-img>
                  </div>
                  <div>
                    <p>{{ menu.menu_name }}</p>
                    <div class="d-flex">
                      <div v-for="option, i in menu.option" :key="i" class="d-flex">
                        <p v-for="item, i in option" :key="i">{{ item }}</p>
                      </div>
                    </div>
                  </div>
                </v-col>
              </v-col>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
        <!-- <div>
          <v-card-title v-for="restaurant, i in restaurants" :key="i" class="d-flex">
            <p class="text-h5 fw-600">{{restaurant.rst_name}}</p>
            </v-card-title
          >
          <v-col :key="i" class="pt-0" cols="12">
            <v-card-actions>
            <v-col
            cols="3"
            class="pa-0 pr-4 d-flex align-center justify-space-between"
          >
            <v-btn
              elevation="2"
              size="small"
              color="it"
              icon
              ><v-icon>mdi-minus</v-icon></v-btn
            >
            <p class="text-center text-h5 fw-600">

            </p>
            <v-btn
              elevation="2"
              size="small"
              color="it"
              icon
              ><v-icon>mdi-plus</v-icon></v-btn
            >
          </v-col>
          </v-card-actions>
          </v-col>
        </div> -->
        <v-card-text class="pr-0 pl-2 py-0"> </v-card-text>
      </v-card-items>
    </v-card>

    <v-card elevation="0">
      <v-card-items>
        <v-card-actions class="ma-5">
          <v-col cols="8" class="pa-0">
            <v-btn class="bg-success w-100" size="x-large">เพิ่มใส่ตะกร้า - 0.00</v-btn>
          </v-col></v-card-actions>
      </v-card-items>
    </v-card>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      //
    };
  },
  props: {
    basket: {
      type: Object,
    },
  },
};
</script>
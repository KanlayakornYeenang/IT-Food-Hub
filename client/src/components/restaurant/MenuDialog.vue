<template>
  <v-card color="#f7f7f7" style="min-width: 25vw">
    <v-card elevation="0" class="mb-2 pa-2">
      <div class="text-right mb-2">
        <v-btn
          color="transparent"
          icon
          @click="this.$emit('updateDialog', false)"
          elevation="0"
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
          <v-card-title> {{ option.option_name }} </v-card-title
          ><v-card-subtitle class="pa-0 pt-1"
            >เลือกได้สูงสุด {{ option.max_optional }}</v-card-subtitle
          >
        </div>
        <v-card-text class="pr-0 pl-2 py-0">
          <div v-if="option.max_optional > 1">
            <div v-for="(item, i) in option.item" :key="i">
              <Checkbox :item="item" />
            </div>
          </div>
          <div v-else>
            <Radio :option="option.item" />
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
          <v-col cols="4" class="pa-0 pr-4 d-flex align-center justify-space-between">
            <v-btn elevation="2" size="small" color="it" icon
              ><v-icon>mdi-minus</v-icon></v-btn
            >
            <p class="text-center text-h5 fw-600">0</p>
            <v-btn elevation="2" size="small" color="it" icon
              ><v-icon>mdi-plus</v-icon></v-btn
            >
          </v-col>
          <v-col cols="8" class="pa-0">
            <v-btn class="bg-success w-100" size="x-large"
              >เพิ่มไปยังตะกร้า - 0</v-btn
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

export default {
  data() {
    return {
      options: null,
    };
  },
  props: {
    menu: {
      type: Object,
    },
  },
  mounted() {
    axios
      .get(this.$route.path + "/" + this.menu.menu_id)
      .then((res) => {
        this.options = res.data;
        console.log(res.data);
      })
      .catch((err) => {
        this.$router.push("/");
      });
  },
};
</script>
<template>
  <v-card rounded="lg" elevation="2" class="overflow-hidden">
    <v-img
      src="https://d21dsidbdoi5kv.cloudfront.net/wp-content/uploads/2022/09/5-13.jpg"
    ></v-img>
    <v-card-item>
      <v-card-title>{{ menu.menu_name }}</v-card-title>
      <v-card-subtitle v-if="menu.menu_desc" class="my-2">{{menu.menu_desc}}</v-card-subtitle>
      <v-card-actions class="d-flex justify-space-between">
        <v-card-title class="fw-600">{{
          formatNumber(menu.menu_price)
        }}</v-card-title>
        <v-btn elevation="2" class="bg-success pa-0 ma-0" size="small"
          ><v-icon>mdi-plus</v-icon></v-btn
        >
      </v-card-actions>
    </v-card-item></v-card
  >
</template>

<script>
export default {
  data() {
    return {
      //
    };
  },
  props: {
    menu: {
      type: Object,
    },
  },
  methods: {
    formatNumber(number) {
      if (number.split(".")[1] == "00") {
        return number.split(".")[0];
      }
      return number;
    },
  },
};
</script>
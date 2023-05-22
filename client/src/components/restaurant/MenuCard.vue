<template>
  <div>
    <v-card @click="dialog = true" rounded="lg" elevation="2" class="overflow-hidden">
      <v-img v-if="menu.file_paht != '' " :src="(menu.file_path !=null) ? file_path :second_file_path"></v-img>
      <v-card-item>
        <v-card-title>{{ menu.menu_name }}</v-card-title>
        <v-card-subtitle v-if="menu.menu_desc" class="my-2">
          {{ menu.menu_desc }}
        </v-card-subtitle>
        <v-card-actions class="d-flex justify-space-between">
          <v-card-title class="fw-600">
            {{ formatNumber(menu.menu_price) }}
          </v-card-title>
          <v-btn elevation="2" class="bg-success pa-0 ma-0" size="small">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card-item>
    </v-card>

    <v-dialog v-model="dialog" scroll-strategy="close" width="600">
      <MenuDialog :restaurant_name="restaurant_name" :menu="menu" @updateDialog="updateDialog" />
    </v-dialog>
  </div>
</template>

<script setup>
import MenuDialog from "@/components/restaurant/MenuDialog.vue";
</script>

<script>
export default {
  props: {
    restaurant_name: {
      type: String
    },
    menu: {
      type: Object,
    },
  },
  data() {
    return {
      dialog: false,
      file_path: 'http://localhost:5000'+ this.menu.file_path,
      second_file_path: 'https://endlessicons.com/wp-content/uploads/2012/11/image-holder-icon-614x460.png'
    };
  },
  methods: {
    formatNumber(number) {
      if (number.split(".")[1] == "00") {
        return number.split(".")[0];
      }
      return number;
    },
    updateDialog(dialog) {
      this.dialog = dialog;
    },
  },
};
</script>
